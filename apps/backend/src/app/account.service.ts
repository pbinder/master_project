import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';
import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api'


@Injectable()
export class AccountService {
  getSummonerByName(): Promise<RiotAPITypes.Summoner.SummonerDTO> {

    const rAPI = new RiotAPI(environment.RIOT_LOL_API_KEY);

    const summoner = rAPI.summoner.getBySummonerName({
        region: PlatformId.EUW1,
        summonerName: "Tiradur",
      });
      console.log('hello', summoner)

    return summoner
  }

}
