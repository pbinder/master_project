import { Controller, Get, Query } from '@nestjs/common';

import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('getSummonerByName')
  getSummonerByName() {
    return this.accountService.getSummonerByName();
  }

  @Get('getAllChampions')
  getAllChampions() {
    return this.accountService.getAllChampions();
  }

  @Get('getChampionByName')
  getChampionByName(@Query('championName')championName : string) {
    return this.accountService.getChampionByName(championName);
  }

  @Get('getLiveMatchData')
  getLiveMatchData() {
    return this.accountService.getLiveMatchData();
  }

}
