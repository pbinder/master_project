
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summoner } from '@visual-analytics/frontpage/dto';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  url = '/api/summoner/';

  constructor(private httpClient: HttpClient) { }

  getSummoner() : Observable<Summoner>{
    return this.httpClient.get<Summoner>(this.url +'getSummonerByName')
  }
}
