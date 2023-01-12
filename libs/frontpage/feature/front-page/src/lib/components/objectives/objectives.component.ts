import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {GameState} from "@visual-analytics/frontpage/dto";
import {EChartsOption} from "echarts";

@Component({
	selector: "lib-objectives",
	templateUrl: "./objectives.component.html",
	styleUrls: ["./objectives.component.scss"],
})
export class ObjectivesComponent implements OnInit, OnDestroy {
	@Input() gameState!: GameState;
	@Input() gameTimeInMinutes!: number;
	@Input() gameTimeInSeconds!: number;
	@Input() participationPercentage: number;
	@Input() isHeraldDead: boolean;
	@Input() isBaronDead: boolean;
	@Input() isDragonDead: boolean;
	@Input() isInhibDead: boolean;
	@Input() heraldKillTime: number;
	@Input() baronKillTime: number;
	@Input() dragonKillTime: number;
	@Input() inhibKillTime: number;

	options: EChartsOption;
	updateOptions: any;

	private data: any[];
	private timer: any;

	ngOnInit(): void {
		// generate some random testing data:
		this.data = [];

		for (let i = 0; i < 1000; i++) {
			this.data.push(this.getData());
		}

		// initialize chart options:
		this.options = {
			title: {
				text: "Objective Participation",
				textStyle: {
					fontSize: 15,
					color: "#ffffffcc",
				},
			},
			textStyle: {
				color: "#ffffffcc",
			},
			tooltip: {
				trigger: "axis",
				formatter: (params: any) => {
					params = params[0];
					return params.name + "m : " + Math.round(params.value[1] * 100) / 100 + "%";
				},
				axisPointer: {
					animation: false,
				},
			},
			xAxis: {
				name: "Time",
				type: "value",
				splitLine: {
					show: false,
				},
			},
			yAxis: {
				type: "value",
				min: 0,
				max: 100,
				axisLabel: {
					formatter: (value: number) => {
						return value + "%";
					},
				},
				splitLine: {
					show: false,
				},
			},
			series: [
				{
					name: "Mocking Data",
					type: "line",
					showSymbol: false,
					data: this.data,
				},
			],
		};

		// Mock dynamic data:
		this.timer = setInterval(() => {
			for (let i = 0; i < 5; i++) {
				//	this.data.shift();
				this.data.push(this.getData());
			}

			// update series data:
			this.updateOptions = {
				series: [
					{
						data: this.data,
					},
				],
			};
		}, 1000);
	}

	ngOnDestroy(): void {
		clearInterval(this.timer);
	}

	getData() {
		return {
			name: this.gameTimeInMinutes,
			value: [this.gameTimeInMinutes, this.participationPercentage * 100],
		};
	}
}
