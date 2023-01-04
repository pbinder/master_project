import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ChampionDetection } from "@visual-analytics/frontpage/dto";

@Injectable({
	providedIn: "root",
})
export class DetectionDataService {
	url = "/api/";

	constructor(private httpClient: HttpClient) {}

	getChampionDetection(): Observable<ChampionDetection[]> {
		return this.httpClient.get<ChampionDetection[]>(this.url + "getChampionDetection");
	}

	setChampions(): Observable<number> {
		return this.httpClient.post<number>(this.url + "setChampions", null);
	}
}
