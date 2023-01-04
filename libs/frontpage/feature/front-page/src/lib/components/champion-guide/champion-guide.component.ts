import {AfterViewInit, Component, Input} from "@angular/core";
import {ChampionGuides, ChampionGuide, GameState, BasicChampion} from "@visual-analytics/frontpage/dto";

@Component({
	selector: "lib-champion-guide",
	templateUrl: "./champion-guide.component.html",
	styleUrls: ["./champion-guide.component.scss"],
})
export class ChampionGuideComponent implements AfterViewInit {
	@Input() champions!: string[];
	@Input() championInfos!: BasicChampion[];
	@Input() gameState!: GameState;

	guides: ChampionGuide[] = [];
	championIcons: string[] = [];

	ngAfterViewInit(): void {
		this.getChampionGuides();
	}

	getChampionGuides(): void {
		this.champions?.forEach((champion: string) => {
			this.guides.push(ChampionGuides[champion.toLowerCase()]);
			this.championIcons.push(`assets/resources/dragontail/12.20.1/img/champion/${champion}.png`);
		});
	}
}
