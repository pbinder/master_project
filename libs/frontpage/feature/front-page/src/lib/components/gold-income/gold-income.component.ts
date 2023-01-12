import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {GameState} from "@visual-analytics/frontpage/dto";

@Component({
	selector: "lib-gold-income",
	templateUrl: "./gold-income.component.html",
	styleUrls: ["./gold-income.component.scss"],
})
export class GoldIncomeComponent implements OnInit, OnDestroy {
	@Input() gameState!: GameState;
	@Input() gameTimeInMinutes!: number;
	@Input() creepScore: number | undefined = 0;
	@Input() goldIncome!: number;

	options: any;
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
				text: "Gold Income per Minute",
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
					return params.name + "m : " + Math.round(params.value[1]) + "gpm";
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
				max: 1000,
				splitLine: {
					show: false,
				},
			},
			series: [
				{
					name: "AVG Gold Income",
					type: "line",
					showSymbol: false,
					emphasis: {
						line: false,
					},
					data: this.data,
				},
			],
		};

		// Mock dynamic data:
		this.timer = setInterval(() => {
			this.data.push(this.getData());

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
		let gpm: number = Math.round((this.goldIncome / this.gameTimeInMinutes) * 100) / 100;
		if (this.gameTimeInMinutes < 1) gpm = 500;

		return {
			name: this.gameTimeInMinutes,
			value: [this.gameTimeInMinutes, gpm],
		};
	}
}
