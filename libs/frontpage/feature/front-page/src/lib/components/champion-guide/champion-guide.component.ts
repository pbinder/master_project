import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {ChampionGuides, ChampionGuide} from "@visual-analytics/frontpage/dto";

@Component({
	selector: "lib-champion-guide",
	templateUrl: "./champion-guide.component.html",
	styleUrls: ["./champion-guide.component.scss"],
})
export class ChampionGuideComponent implements AfterViewInit {
	@Input() champions!: string[];
	@Input() gameTime!: string;

	guides: ChampionGuide[] = [];
	championIcons: string[] = [];

	ngAfterViewInit(): void {
		console.log(this.champions, this.gameTime);
		this.getChampionGuides();
	}

	getChampionGuides(): void {
		this.champions?.forEach((champion: string) => {
			this.guides.push(ChampionGuides[champion.toLowerCase()]);
			this.championIcons.push(`assets/resources/dragontail/12.6.1/img/champion/${champion}.png`);
		});
	}
}
