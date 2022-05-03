import { Component } from '@angular/core';
import { AccountDataService } from '@visual-analytics/frontpage/data-access';
import { Summoner,  ChampionList, LiveGameData, LivePlayerData, BasicChampion, Skin } from '@visual-analytics/frontpage/dto';
import { take } from 'rxjs';

@Component({
  selector: 'lib-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
})
export class FrontpageComponent {

  summoner!: Summoner;
  champions!: ChampionList;
  gameData!: LiveGameData;
  championInfo!: BasicChampion
  image = ''

  constructor(private readonly accountDataService: AccountDataService) {
    this.accountDataService.getSummoner().pipe(take(1)).subscribe((sum:Summoner) => {
      this.summoner = sum;
    })

    this.accountDataService.getLiveMatchData().pipe(take(1)).subscribe((gameData:LiveGameData) => {
      this.gameData = gameData;
      console.log('game',gameData)
      this.gameData.allPlayers.forEach((player: LivePlayerData)=> {
        if(player.summonerName == this.summoner?.name){
          this.accountDataService.getChampion(player.championName).pipe(take(1)).subscribe((champion:ChampionList) => {
            this.championInfo = champion.data[player.championName];
            const currentSkin: Skin | undefined = this.championInfo.skins.find((skin: Skin) => skin.name == player.skinName)
            this.image = `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${this.championInfo.id + '_' + currentSkin?.num}.jpg`
            console.log('CHAMP', this.championInfo)
          })

        }
      })
    })
  }

}
