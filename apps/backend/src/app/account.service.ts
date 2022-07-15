import {HttpService} from "@nestjs/axios";
import {environment} from "../environments/environment";
import {RiotAPI, RiotAPITypes, PlatformId, DDragon} from "@fightmegg/riot-api";
import {Injectable} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {LiveGameData} from "@visual-analytics/frontpage/dto";

@Injectable()
export class AccountService {
	constructor(private httpService: HttpService) {}

	getSummonerByName(): Promise<RiotAPITypes.Summoner.SummonerDTO> {
		const rAPI = new RiotAPI(environment.RIOT_LOL_API_KEY);

		const summoner = rAPI.summoner.getBySummonerName({
			region: PlatformId.EUW1,
			summonerName: "Tiradur",
		});

		return summoner;
	}

	getAllChampions(): Promise<RiotAPITypes.DDragon.DDragonChampionListDTO> {
		const ddragon = new DDragon();
		const champs = ddragon.champion.all();

		return champs;
	}

	getChampionByName(championName: string): Promise<RiotAPITypes.DDragon.DDragonChampionDTO> {
		const ddragon = new DDragon();
		const champ = ddragon.champion.byName({locale: RiotAPITypes.DDragon.LOCALE.en_US, version: "", championName});

		return champ;
	}

	getLiveMatchData(): Observable<LiveGameData> {
		const getGameData = environment.LIVE_CLIENT + "allgamedata";
		return this.httpService.get(getGameData).pipe(map(response => response.data));
	}
}
