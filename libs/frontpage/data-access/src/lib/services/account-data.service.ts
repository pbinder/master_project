import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChampionList, Iteminfo, LiveGameData, Summoner} from "@visual-analytics/frontpage/dto";

@Injectable({
	providedIn: "root",
})
export class AccountDataService {
	url = "/api/";

	constructor(private httpClient: HttpClient) {}

	getSummoner(summonerName: string): Observable<Summoner> {
		const params: HttpParams = new HttpParams().set("summonerName", summonerName);
		return this.httpClient.get<Summoner>(this.url + "getSummonerByName", {params});
	}

	getAllChampions(): Observable<ChampionList> {
		return this.httpClient.get<ChampionList>(this.url + "getAllChampions");
	}

	getChampion(championName: string): Observable<ChampionList> {
		const params: HttpParams = new HttpParams().set("championName", championName);
		return this.httpClient.get<ChampionList>(this.url + "getChampionByName", {params});
	}

	getLiveMatchData(): Observable<LiveGameData> {
		return this.httpClient.get<LiveGameData>(this.url + "getLiveMatchData");
	}

	getItemInfo(): Observable<Iteminfo> {
		return this.httpClient.get<Iteminfo>(this.url + "getItemInfo");
	}
}
