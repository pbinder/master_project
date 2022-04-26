import { Component, OnInit } from '@angular/core';
import { AccountDataService } from '@visual-analytics/frontpage/data-access';
import { Summoner } from '@visual-analytics/frontpage/dto';
import { take } from 'rxjs';

@Component({
  selector: 'lib-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
})
export class FrontpageComponent implements OnInit {

    constructor(private readonly accountDataService: AccountDataService) {
      this.accountDataService.getSummoner().pipe(take(1)).subscribe((sum:Summoner) => {
        console.log('WOLWOLOLO',sum)
      })
  }

  ngOnInit(): void {
  }

}
