import {Component, Input} from "@angular/core";
import { GameState } from "@visual-analytics/frontpage/dto";

@Component({
	selector: "lib-gold-income",
	templateUrl: "./gold-income.component.html",
	styleUrls: ["./gold-income.component.scss"],
})
export class GoldIncomeComponent {
	@Input() gameState!: GameState;
	@Input() gameTimeInSeconds!: number;
	@Input() creepScore: number | undefined = 0;
	@Input() goldIncome!: number;

}
