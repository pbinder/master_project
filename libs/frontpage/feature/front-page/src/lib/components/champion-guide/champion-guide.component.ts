import {Component, Input} from "@angular/core";
import {ChampionGuide, GameState, BasicChampion} from "@visual-analytics/frontpage/dto";

@Component({
	selector: "lib-champion-guide",
	templateUrl: "./champion-guide.component.html",
	styleUrls: ["./champion-guide.component.scss"],
})
export class ChampionGuideComponent {
	@Input() champions!: string[];
	@Input() championInfos!: BasicChampion[];
	@Input() championIcons!: string[];
	@Input() gameState!: GameState;

	guides: ChampionGuide[] = [];
}
