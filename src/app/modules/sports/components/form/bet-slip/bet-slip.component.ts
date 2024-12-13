import { Component, Input } from '@angular/core';

interface UserBet {
  eventName: string;
  selectedOutcomeName: string;
  odds: number;
  stake: number;
  potentialWin: number;
}

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent {
  @Input() bets: UserBet[] = [];
}
