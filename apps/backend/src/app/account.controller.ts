import { Controller, Get } from '@nestjs/common';

import { AccountService } from './account.service';

@Controller('summoner')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('getSummonerByName')
  getSummonerByName() {
    return this.accountService.getSummonerByName();
  }

}
