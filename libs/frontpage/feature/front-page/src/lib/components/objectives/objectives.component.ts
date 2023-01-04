import {Component, Input} from "@angular/core";
import { GameState } from "@visual-analytics/frontpage/dto";

@Component({
	selector: "lib-objectives",
	templateUrl: "./objectives.component.html",
	styleUrls: ["./objectives.component.scss"],
})
export class ObjectivesComponent {
	@Input() gameState!: GameState;

}
