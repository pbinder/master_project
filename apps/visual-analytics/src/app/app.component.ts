import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api'

@Component({
  selector: 'master-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  constructor(){



      (async () => {
          const rAPI = new RiotAPI(environment.RIOT_LOL_API_KEY);

          const summoner = await rAPI.summoner.getBySummonerName({
              region: PlatformId.EUW1,
              summonerName: "Tiradur",
            });
            console.log('hello', summoner)
      })()
  }

}
