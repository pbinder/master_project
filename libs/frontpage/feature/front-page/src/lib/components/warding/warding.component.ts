import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {GameState, LanePosition, LaneState, Side} from "@visual-analytics/frontpage/dto";

@Component({
	selector: "lib-warding",
	templateUrl: "./warding.component.html",
	styleUrls: ["./warding.component.scss"],
})
export class WardingComponent implements OnChanges {
	@Input() playerLane!: LanePosition;
	@Input() gameState!: GameState;
	@Input() laneState!: LaneState;
	@Input() side!: Side;

	wardingImage = `assets/resources/warding/Early-Laning.jpg`;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["playerLane"]?.currentValue || changes["laneState"]?.currentValue) {
			if (this.playerLane !== LanePosition.None && this.laneState && this.side) {
				this.wardingImage = `assets/resources/warding/${this.playerLane}-${this.laneState}-${this.side}.jpg`;
				console.log("lanestate", this.laneState, this.wardingImage);
			}
		}
	}
}
