import {Component, Input} from "@angular/core";

@Component({
	selector: "lib-info-tab",
	templateUrl: "./info-tab.component.html",
	styleUrls: ["./info-tab.component.scss"],
})
export class InfoTabComponent {
	@Input() kda!: number;
	@Input() minionScore!: number;
	@Input() visionScore!: number;
	@Input() gpm!: number;
	@Input() objectivePercentage!: number;
	@Input() gameTimeInMinutes!: number;
}
