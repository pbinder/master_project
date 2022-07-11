import {Component, OnInit} from "@angular/core";
import {AccountDataService} from "@visual-analytics/frontpage/data-access";
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
	ChampionGuides,
	ChampionGuide,
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
	champions!: ChampionList;
	gameData!: LiveGameData;
	championInfo!: BasicChampion;
	activePlayer!: ActivePlayerData;
	perks!: CommunityDragonRune[];
	activeChampionRunes: CommunityDragonRune[] = [];
	guide!: ChampionGuide;
	scores!: LiveScores;
	gametime = "early";

	image = "";

	constructor(
		private readonly accountDataService: AccountDataService,
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
		interval(1000)
			.pipe(
				startWith(0),
				switchMap(() => this.accountDataService.getLiveMatchData())
			)
			.subscribe((gameData: LiveGameData) => {
				this.gameData = gameData;
				this.activePlayer = gameData.activePlayer;
				this.gametime =
					this.gameData.gameData.gameTime / 60 < 25
						? this.gameData.gameData.gameTime / 60 < 15
							? "early"
							: "mid"
						: "late";
				this.gameData.allPlayers.forEach((player: LivePlayerData) => {
					if (player.summonerName == this.summoner?.name) {
						this.scores = player.scores;
					}
					console.log("game", gameData);
				});
			});
	}

	getInitialData(): void {
		this.accountDataService
			.getLiveMatchData()
			.pipe(take(1))
			.subscribe((gameData: LiveGameData) => {
				this.gameData = gameData;
				this.activePlayer = gameData.activePlayer;
				this.getMatchedRunes();
				gameData?.allPlayers.forEach((player: LivePlayerData) => {
					if (player?.summonerName === this.summoner?.name) {
						this.scores = player.scores;
						this.guide = ChampionGuides[player?.championName.toLowerCase()];
						this.accountDataService
							.getChampion(player.championName)
							.pipe(take(1))
							.subscribe((champion: ChampionList) => {
								this.championInfo = champion.data[player.championName];
								const currentSkin: Skin | undefined = this.championInfo.skins.find(
									(skin: Skin) => skin.name === player.skinName
								);

								this.image = this.dataDragonService.getChampionSkinTile(
									this.championInfo.id,
									currentSkin?.num
								);
								console.log("CHAMP", this.championInfo);
							});
					}
				});
			});
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
