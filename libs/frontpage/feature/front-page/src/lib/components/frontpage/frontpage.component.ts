import {Component, OnInit} from "@angular/core";
import {AccountDataService, DetectionDataService} from "@visual-analytics/frontpage/data-access";
import {
	Summoner,
	ChampionList,
	LiveGameData,
	LivePlayerData,
	BasicChampion,
	Skin,
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
} from "@visual-analytics/frontpage/dto";
import {interval, startWith, switchMap, take} from "rxjs";
import {CommunityDragonService} from "../../services/community-dragon.service";
import {DataDragonService} from "../../services/data-dragon.service";

@Component({
	selector: "lib-frontpage",
	templateUrl: "./frontpage.component.html",
	styleUrls: ["./frontpage.component.scss"],
})
export class FrontpageComponent implements OnInit {
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
	currentTime = "";
	playerLane: LanePosition = LanePosition.Top;
	laneState: LaneState = LaneState.Start;
	side: Side = Side.Blue;
	gameTimeInSeconds!: number;
	goldIncome = 0;
	itemInfo!: Iteminfo;

	constructor(
		private readonly accountDataService: AccountDataService,
		private readonly detectionDataService: DetectionDataService,
		private readonly communityDragonService: CommunityDragonService,
		private readonly dataDragonService: DataDragonService
	) {
		this.perks = this.communityDragonService.getRunePerks();
		this.accountDataService
			.getSummoner()
			.pipe(take(1))
			.subscribe((sum: Summoner) => {
				this.summoner = sum;
				this.getInitialData();
			});
	}

	ngOnInit(): void {
		this.detectionDataService.setChampions().pipe(take(1)).subscribe();

		interval(2000)
			.pipe(
				startWith(0),
				switchMap(() => this.accountDataService.getLiveMatchData())
			)
			.subscribe((gameData: LiveGameData) => {
				this.gameData = gameData;

				this.activePlayer = gameData.activePlayer;
				this.gameTimeInSeconds = Math.round((this.gameData.gameData.gameTime * 100) / 60) / 100;
				this.setTime(this.gameData.gameData.gameTime);
				this.gameState = this.currentTime.startsWith("25")
					? this.currentTime.startsWith("15")
						? GameState.Early
						: GameState.Mid
					: GameState.Late;

				console.log("game", gameData);

				this.gameData.allPlayers.forEach((player: LivePlayerData) => {
					if (player.summonerName == this.summoner?.name) {
						this.scores = player.scores;
						this.liveActivePlayerData = player;
						this.setPlayerLane(this.liveActivePlayerData);
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
					console.log("detection", detectionData, this.playerPosition);
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
				//this.getMatchedRunes();

				gameData?.allPlayers.forEach((player: LivePlayerData) => {
					this.champions.push(player.championName);
					if (player?.summonerName === this.summoner?.name) {
						this.playerChampion = player.championName;
						this.scores = player.scores;
						this.side = player.team === "ORDER" ? Side.Blue : Side.Red;
						this.accountDataService
							.getChampion(player.championName)
							.pipe(take(1))
							.subscribe((champion: ChampionList) => {
								this.championInfo = champion.data[player.championName];
								this.championInfos.push(this.championInfo);
								const currentSkin: Skin | undefined = this.championInfo.skins.find(
									(skin: Skin) => skin.name === player.skinName
								);
								this.image = this.dataDragonService.getChampionSkinTile(
									this.championInfo.id,
									currentSkin?.num ? currentSkin.num : 0
								);
							});
					} else {
						this.accountDataService
							.getChampion(player.championName)
							.pipe(take(1))
							.subscribe((champion: ChampionList) => {
								this.championInfo = champion.data[player.championName];
								this.championInfos.push(this.championInfo);
							});
					}
					console.log("info", this.championInfos);
				});
			});
	}

	setPlayerLane(activePlayer: LivePlayerData): void {
		const lane: LanePosition = LanePosition.Mid;

		if (
			activePlayer.summonerSpells.summonerSpellOne.displayName === "Smite" ||
			activePlayer.summonerSpells.summonerSpellTwo.displayName === "Smite"
		) {
			this.playerLane = LanePosition.Jungle;
		}

		const position = activePlayer.position as LanePosition;

		this.playerLane = activePlayer?.position.length > 0 ? position : lane;
		console.log("Pos", this.playerLane, position);
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
