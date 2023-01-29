import {Controller, Get, Post, Query} from "@nestjs/common";

import {AccountService} from "./account.service";

@Controller()
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Get("getSummonerByName")
	getSummonerByName(@Query("summonerName") summonerName: string) {
		return this.accountService.getSummonerByName(summonerName);
	}

	@Get("getAllChampions")
	getAllChampions() {
		return this.accountService.getAllChampions();
	}

	@Get("getChampionByName")
	getChampionByName(@Query("championName") championName: string) {
		return this.accountService.getChampionByName(championName);
	}

	@Get("getLiveMatchData")
	getLiveMatchData() {
		return this.accountService.getLiveMatchData();
	}

	@Get("getChampionDetection")
	getChampionDetection() {
		return this.accountService.getChampionDetection();
	}

	@Post("setChampions")
	setChampions() {
		return this.accountService.setChampions();
	}

	@Get("getItemInfo")
	getItemInfo() {
		return this.accountService.getItemInfo();
	}
}
