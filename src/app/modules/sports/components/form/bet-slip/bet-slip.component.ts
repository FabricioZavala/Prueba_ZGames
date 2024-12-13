import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  styleUrls: ['./bet-slip.component.scss'],
})
export class BetSlipComponent {
  @Input() bets: UserBet[] = []; // Lista de apuestas recibida del componente padre
  @Output() betRemoved = new EventEmitter<number>(); // Evento para eliminar una apuesta

  // Método para emitir el índice de la apuesta que se desea eliminar
  removeBet(index: number) {
    this.betRemoved.emit(index);
  }
}
