import {HttpService} from "@nestjs/axios";
import {environment} from "../environments/environment";
import {RiotAPI, RiotAPITypes, PlatformId, DDragon} from "@fightmegg/riot-api";
import {Injectable} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {ChampionDetection, LiveGameData} from "@visual-analytics/frontpage/dto";

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
		const champ = ddragon.champion.byName({locale: RiotAPITypes.DDragon.LOCALE.en_US, version: environment.PATCH, championName});

		return champ;
	}

	getChampionDetection(): Observable<ChampionDetection[]> {
		const getChampionDetection = environment.PYTHON_BACKEND + "getChampionDetection";
		return this.httpService.get(getChampionDetection).pipe(map(response => response.data));
	}

	setChampions(): Observable<number> {
		const setChampions = environment.PYTHON_BACKEND + "setChampions";
    console.log('hell')
		return this.httpService.post(setChampions).pipe(map(response => response.data));
	}

	getLiveMatchData(): Observable<LiveGameData> {
		const getGameData = environment.LIVE_CLIENT + "allgamedata";
		return this.httpService.get(getGameData).pipe(map(response => response.data));
	}


  getItemInfo(): Promise<RiotAPITypes.DDragon.DDragonItemWrapperDTO> {
		const ddragon = new DDragon();
		const items = ddragon.items({locale: RiotAPITypes.DDragon.LOCALE.en_US, version:  environment.PATCH});
		return items;
	}
}
