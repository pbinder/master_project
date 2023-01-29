import {Component} from "@angular/core";
import {AccountDataService, DetectionDataService} from "@visual-analytics/frontpage/data-access";
import {
	Summoner,
	ChampionList,
	LiveGameData,
	LivePlayerData,
	BasicChampion,
	ActivePlayerData,
	CommunityDragonRune,
	LiveRune,
	LiveScores,
	ChampionGuide,
	LanePosition,
	GameState,
	LaneState,
	Side,
	Iteminfo,
	LiveItem,
	ChampionDetection,
	BOTTOM_COORDINATES,
	MID_COORDINATES,
	TOP_COORDINATES,
	LiveGameEvent,
	EventType,
	BARON_COORDINATES,
	DRAGON_COORDINATES,
	TURRETT1L1,
	TURRETT1C3,
	TURRETT1R1,
	TURRETT2L1,
	TURRETT2C3,
	TURRETT2R1,
	TURRETT1L3,
	TURRETT1L2,
	TURRETT1C2,
	TURRETT1C1,
	TURRETT1C5,
	TURRETT1C4,
	TURRETT1R2,
	TURRETT1R3,
	TURRETT2L2,
	TURRETT2L3,
	TURRETT2C1,
	TURRETT2C2,
	TURRETT2C4,
	TURRETT2C5,
	TURRETT2R2,
	TURRETT2R3,
	TURRETT1C1STRING,
	TURRETT1C2STRING,
	TURRETT1C3STRING,
	TURRETT1C4STRING,
	TURRETT1C5STRING,
	TURRETT1L1STRING,
	TURRETT1L2STRING,
	TURRETT1L3STRING,
	TURRETT1R1STRING,
	TURRETT1R2STRING,
	TURRETT1R3STRING,
	TURRETT2C1STRING,
	TURRETT2C2STRING,
	TURRETT2C3STRING,
	TURRETT2C4STRING,
	TURRETT2C5STRING,
	TURRETT2L1STRING,
	TURRETT2L2STRING,
	TURRETT2L3STRING,
	TURRETT2R1STRING,
	TURRETT2R2STRING,
	TURRETT2R3STRING,
} from "@visual-analytics/frontpage/dto";
import {BehaviorSubject, distinctUntilChanged, interval, startWith, switchMap, take} from "rxjs";
import {SUMMONER_NAME} from "../../constants/constants";
import {CommunityDragonService} from "../../services/community-dragon.service";
import {DataDragonService} from "../../services/data-dragon.service";

@Component({
	selector: "lib-frontpage",
	templateUrl: "./frontpage.component.html",
	styleUrls: ["./frontpage.component.scss"],
})
export class FrontpageComponent {
	summoner!: Summoner;
	champions: string[] = [];
	gameData!: LiveGameData;
	championInfo!: BasicChampion;
	championInfos: BasicChampion[] = [];
	activePlayer!: ActivePlayerData;
	playerChampion!: string;
	playerPosition!: number[];
	liveActivePlayerData!: LivePlayerData;
	perks!: CommunityDragonRune[];
	activeChampionRunes: CommunityDragonRune[] = [];
	guide!: ChampionGuide;
	scores: LiveScores | undefined;
	gameState: GameState = GameState.Early;
	image = "";
	summonerName = SUMMONER_NAME;
	currentTime = "";
	playerLane: LanePosition;
	laneState: LaneState;
	side: Side = Side.Blue;
	gameTimeInMinutes!: number;
	gameTimeInSeconds!: number;
	goldIncome = 0;
	itemInfo!: Iteminfo;
	playerLaneIsSet = false;
	championIcons: string[] = [];
	gameEvents$ = new BehaviorSubject<LiveGameEvent[]>([]);
	participation = 0;
	participationPercentage = 0;
	isHeraldDead = false;
	isBaronDead = false;
	isDragonDead = false;
	isInhibDead = false;
	heraldKillTime = 0;
	baronKillTime = 0;
	dragonKillTime = 0;
	inhibKillTime = 0;

	constructor(
		private readonly accountDataService: AccountDataService,
		private readonly detectionDataService: DetectionDataService,
		private readonly communityDragonService: CommunityDragonService,
		private readonly dataDragonService: DataDragonService
	) {
		this.perks = this.communityDragonService.getRunePerks();
		this.detectionDataService.setChampions().pipe(take(1)).subscribe();
		this.accountDataService
			.getSummoner(this.summonerName)
			.pipe(take(1))
			.subscribe((sum: Summoner) => {
				this.summoner = sum;
				this.getInitialData();
			});

		interval(2000)
			.pipe(
				startWith(0),
				switchMap(() => this.accountDataService.getLiveMatchData())
			)
			.subscribe((gameData: LiveGameData) => {
				this.gameData = gameData;

				this.activePlayer = gameData.activePlayer;
				this.gameTimeInSeconds = this.gameData.gameData.gameTime;
				this.setTime(this.gameTimeInSeconds);
				this.updateKillFlags(this.gameTimeInSeconds);
				this.gameTimeInMinutes = Math.round((this.gameTimeInSeconds * 100) / 60) / 100;
				this.gameState = this.currentTime.startsWith("25")
					? this.currentTime.startsWith("15")
						? GameState.Early
						: GameState.Mid
					: GameState.Late;

				this.gameEvents$.next(gameData.events.Events);

				if (this.gameTimeInSeconds > 105 && !this.playerLaneIsSet) {
					this.laneState = LaneState.Start;
					this.setPlayerLane(this.liveActivePlayerData);
				}

				this.gameData.allPlayers.forEach((player: LivePlayerData) => {
					if (player.summonerName == this.summoner?.name) {
						this.scores = player.scores;
						this.liveActivePlayerData = player;
						this.setGoldIncome();
					}
				});
			});

		interval(2000)
			.pipe(
				startWith(0),
				switchMap(() => this.detectionDataService.getChampionDetection())
			)
			.subscribe((detectionData: ChampionDetection[]) => {
				const playerDetected = detectionData.find(
					(champion: ChampionDetection) => champion.name === this.playerChampion
				);
				if (playerDetected) {
					this.playerPosition = [playerDetected.xmax - 17.5, playerDetected.ymax - 17.5];
					console.log("PLAYERPOSITION", this.playerPosition);
				}
			});

		this.gameEvents$
			.pipe(distinctUntilChanged((previous, current) => previous.length === current.length))
			.subscribe((events: LiveGameEvent[]) => {
				if (events.length > 0) {
					let lastEvent: LiveGameEvent = events[events.length - 1];

					if (lastEvent.EventName === EventType.FirstBrick) {
						lastEvent = events[events.length - 2];
					}

					const objectiveEvents: LiveGameEvent[] = events.filter(
						(event: LiveGameEvent) =>
							event.EventName === EventType.BaronKill ||
							event.EventName === EventType.HeraldKill ||
							event.EventName === EventType.TurretKilled ||
							event.EventName === EventType.DragonKill ||
							event.EventName === EventType.InhibKilled
					);

					if (
						lastEvent.EventName === EventType.BaronKill ||
						lastEvent.EventName === EventType.HeraldKill ||
						lastEvent.EventName === EventType.TurretKilled ||
						lastEvent.EventName === EventType.DragonKill ||
						lastEvent.EventName === EventType.InhibKilled
					) {
						switch (lastEvent.EventName) {
							case EventType.BaronKill:
								this.isBaronDead = true;
								this.baronKillTime = lastEvent.EventTime;
								if (this.isInVicinity(this.playerPosition, BARON_COORDINATES)) {
									this.participation++;
								}
								break;
							case EventType.HeraldKill:
								this.isHeraldDead = true;
								this.heraldKillTime = lastEvent.EventTime;
								if (this.isInVicinity(this.playerPosition, BARON_COORDINATES)) {
									this.participation++;
								}
								break;
							case EventType.TurretKilled: {
								if (
									(lastEvent.TurretKilled.includes("T2") && this.side === Side.Blue) ||
									(lastEvent.TurretKilled.includes("T1") && this.side === Side.Red)
								) {
									const turretCoordinates = this.getObjectiveCoordinates(
										lastEvent.TurretKilled,
										EventType.TurretKilled
									);
									if (this.isInVicinity(this.playerPosition, turretCoordinates)) {
										this.participation++;
									}
								} else {
									objectiveEvents.pop();
								}
								this.setLaneState(lastEvent.TurretKilled);

								break;
							}
							case EventType.DragonKill: {
								this.isDragonDead = true;
								this.dragonKillTime = lastEvent.EventTime;
								if (this.isInVicinity(this.playerPosition, DRAGON_COORDINATES)) {
									this.participation++;
								}
								break;
							}
							case EventType.InhibKilled: {
								this.isInhibDead = true;
								this.inhibKillTime = lastEvent.EventTime;
								if (
									(lastEvent.TurretKilled.includes("T2") && this.side === Side.Blue) ||
									(lastEvent.TurretKilled.includes("T1") && this.side === Side.Red)
								) {
									const inhibCoordinates = this.getObjectiveCoordinates(
										lastEvent.InhibKilled,
										EventType.InhibKilled
									);
									if (this.isInVicinity(this.playerPosition, inhibCoordinates)) {
										this.participation++;
									}
								} else {
									objectiveEvents.pop();
								}
								break;
							}
						}

						this.participationPercentage = this.participation / objectiveEvents.length;
						console.log("EVENTS", events, objectiveEvents);
					}
				}
			});
	}

	getInitialData(): void {
		this.accountDataService
			.getItemInfo()
			.pipe(take(1))
			.subscribe((info: Iteminfo) => (this.itemInfo = info));
		this.accountDataService
			.getLiveMatchData()
			.pipe(take(1))
			.subscribe((gameData: LiveGameData) => {
				this.gameData = gameData;
				this.activePlayer = gameData.activePlayer;

				gameData?.allPlayers.forEach((player: LivePlayerData) => {
					let championName = player.championName.replace(" ", "").replace("'", "").replace(".", "");
					if (championName === "Wukong") {
						championName = "MonkeyKing";
					}
					this.champions.push(championName);
					if (player?.summonerName === this.summoner?.name) {
						this.playerChampion = championName;
						this.scores = player.scores;
						this.side = player.team === "ORDER" ? Side.Blue : Side.Red;
						this.accountDataService
							.getChampion(championName)
							.pipe(take(1))
							.subscribe((champion: ChampionList) => {
								this.championInfo = champion.data[championName];
								this.championInfos.push(this.championInfo);
								this.championIcons.push(
									`assets/resources/dragontail/12.20.1/img/champion/${this.championInfo?.name.trim()}.png`
								);
								/*
								const currentSkin: Skin | undefined = this.championInfo.skins.find(
									(skin: Skin) => skin.name === player.skinName
								);
								this.image = this.dataDragonService.getChampionSkinTile(
									this.championInfo.id,
									currentSkin?.num ? currentSkin.num : 0
								);
                */
							});
					} else {
						this.accountDataService
							.getChampion(championName)
							.pipe(take(1))
							.subscribe((champion: ChampionList) => {
								this.championInfos.push(champion.data[championName]);
								this.championIcons.push(
									`assets/resources/dragontail/12.20.1/img/champion/${championName}.png`
								);
							});
					}
				});
			});
	}

	setLaneState(eventString: string): void {
		console.log("LANE", this.playerLane, eventString);
		switch (this.playerLane) {
			case LanePosition.Top: {
				if (this.side === Side.Blue) {
					if (eventString === TURRETT2L3STRING) {
						this.laneState = LaneState.Winning;
					} else if (eventString === TURRETT1L3STRING) {
						this.laneState = LaneState.Losing;
					}
				} else {
					if (eventString === TURRETT2L3STRING) {
						this.laneState = LaneState.Losing;
					} else if (eventString === TURRETT1L3STRING) {
						this.laneState = LaneState.Winning;
					}
				}
				break;
			}
			case LanePosition.Mid: {
				if (this.side === Side.Blue) {
					if (eventString === TURRETT2C5STRING) {
						this.laneState = LaneState.Winning;
					} else if (eventString === TURRETT1C5STRING) {
						this.laneState = LaneState.Losing;
					}
				} else {
					if (eventString === TURRETT2C5STRING) {
						this.laneState = LaneState.Losing;
					} else if (eventString === TURRETT1C5STRING) {
						this.laneState = LaneState.Winning;
					}
				}
				break;
			}
			case LanePosition.Bot: {
				if (this.side === Side.Blue) {
					if (eventString === TURRETT2R3STRING) {
						this.laneState = LaneState.Winning;
					} else if (eventString === TURRETT1R3STRING) {
						this.laneState = LaneState.Losing;
					}
				} else {
					if (eventString === TURRETT2R3STRING) {
						this.laneState = LaneState.Winning;
					} else if (eventString === TURRETT1R3STRING) {
						this.laneState = LaneState.Losing;
					}
				}
				break;
			}
		}
	}

	setPlayerLane(activePlayer: LivePlayerData): void {
		let lane: LanePosition = LanePosition.Mid;
		if (this.isInVicinity(this.playerPosition, BOTTOM_COORDINATES)) {
			lane = LanePosition.Bot;
		} else if (this.isInVicinity(this.playerPosition, MID_COORDINATES)) {
			lane = LanePosition.Mid;
		} else if (this.isInVicinity(this.playerPosition, TOP_COORDINATES)) {
			lane = LanePosition.Top;
		}

		if (
			activePlayer?.summonerSpells.summonerSpellOne.displayName === "Smite" ||
			activePlayer?.summonerSpells.summonerSpellTwo.displayName === "Smite"
		) {
			lane = LanePosition.Jungle;
		}

		const position = activePlayer?.position as LanePosition;

		this.playerLane = activePlayer?.position.length > 0 ? position : null;
		if (this.playerLane) {
			this.playerLaneIsSet = true;
		}
		console.log("SET LANE", this.playerLane, position);
	}

	isInVicinity(playerCoordinates: number[], targetCoordinates: number[]): boolean {
		if (
			playerCoordinates &&
			targetCoordinates[0] - 30 < playerCoordinates[0] &&
			playerCoordinates[0] < targetCoordinates[0] + 30 &&
			targetCoordinates[1] - 30 < playerCoordinates[1] &&
			playerCoordinates[1] < targetCoordinates[1] + 30
		) {
			return true;
		} else {
			return false;
		}
	}

	getObjectiveCoordinates(name: string, type: EventType): number[] {
		if (type === EventType.TurretKilled) {
			switch (name) {
				case TURRETT1C1STRING:
					return TURRETT1C1;
				case TURRETT1C2STRING:
					return TURRETT1C2;
				case TURRETT1C3STRING:
					return TURRETT1C3;
				case TURRETT1C4STRING:
					return TURRETT1C4;
				case TURRETT1C5STRING:
					return TURRETT1C5;
				case TURRETT1L1STRING:
					return TURRETT1L1;
				case TURRETT1L2STRING:
					return TURRETT1L2;
				case TURRETT1L3STRING:
					return TURRETT1L3;
				case TURRETT1R1STRING:
					return TURRETT1R1;
				case TURRETT1R2STRING:
					return TURRETT1R2;
				case TURRETT1R3STRING:
					return TURRETT1R3;
				case TURRETT2C1STRING:
					return TURRETT2C1;
				case TURRETT2C2STRING:
					return TURRETT2C2;
				case TURRETT2C3STRING:
					return TURRETT2C3;
				case TURRETT2C4STRING:
					return TURRETT2C4;
				case TURRETT2C5STRING:
					return TURRETT2C5;
				case TURRETT2L1STRING:
					return TURRETT2L1;
				case TURRETT2L2STRING:
					return TURRETT2L2;
				case TURRETT2L3STRING:
					return TURRETT2L3;
				case TURRETT2R1STRING:
					return TURRETT2R1;
				case TURRETT2R2STRING:
					return TURRETT2R2;
				case TURRETT2R3STRING:
					return TURRETT2R3;
			}
		} else if (type === EventType.InhibKilled) {
			if (name.includes("T1")) {
				if (name.includes("L")) {
					return TURRETT1L1;
				} else if (name.includes("C")) {
					return TURRETT1C3;
				} else if (name.includes("R")) {
					return TURRETT1R1;
				}
			} else if (name.includes("T2")) {
				if (name.includes("L")) {
					return TURRETT2L1;
				} else if (name.includes("C")) {
					return TURRETT2C3;
				} else if (name.includes("R")) {
					return TURRETT2R1;
				}
			}
		}
		return [];
	}

	setGoldIncome(): void {
		this.goldIncome = 0;
		this.goldIncome = this.activePlayer.currentGold;

		this.liveActivePlayerData.items.forEach((item: LiveItem) => {
			if (item && this.itemInfo) {
				this.goldIncome += this.itemInfo.data[item?.itemID].gold.total;
			}
		});
	}

	setTime(time: number): void {
		const minutes = Math.floor(time / 60);
		const seconds = Math.round(time - minutes * 60);
		const finalTime = minutes + ":" + seconds;

		this.currentTime = finalTime;
	}

	updateKillFlags(time: number): void {
		if (time > this.heraldKillTime + 360 && this.isHeraldDead) {
			this.isHeraldDead = false;
		} else if (time > this.baronKillTime + 360 && this.isBaronDead) {
			this.isBaronDead = false;
		} else if (time > this.dragonKillTime + 300 && this.isDragonDead) {
			this.isDragonDead = false;
		} else if (time > this.inhibKillTime + 360 && this.isInhibDead) {
			this.isInhibDead = false;
		}
	}

	getMatchedRunes(): void {
		this.activePlayer.fullRunes.generalRunes.forEach((rune: LiveRune) => {
			let communityRune: CommunityDragonRune | undefined = this.perks.find(
				(r: CommunityDragonRune) => r.id === rune.id
			);
			if (communityRune) {
				communityRune = {
					...communityRune,
					iconPath: "assets/resources/dragontail/img/" + communityRune?.iconPath,
				};
				this.activeChampionRunes.push(communityRune);
			}
		});
	}
}
