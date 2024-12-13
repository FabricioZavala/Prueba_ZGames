import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SportsBettingService } from 'src/app/core/services/sports-betting.service';
import { Bet } from 'src/app/core/interfaces/bet.interface';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss'],
})
export class BetSlipComponent {
  @Input() bets: Bet[] = []; // Lista de apuestas recibida del componente padre
  @Output() betRemoved = new EventEmitter<number>(); // Evento para eliminar una apuesta

  constructor(private sportsBettingService: SportsBettingService) {}

  // Método para emitir el índice de la apuesta que se desea eliminar
  removeBet(index: number) {
    this.betRemoved.emit(index);
  }

  saveBets(): void {
    const bet = {
      eventId: 'sr:match:51467915',
      eventName: 'Pisa SC vs. SSC Bari',
      selectedOutcomeName: 'Pisa SC',
      odds: 1.87,
      stake: 54,
      potentialWin: 100.98,
    };
  
    this.sportsBettingService.placeBet(bet).subscribe({
      next: (response) => {
        console.log('Bet saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving bet:', error);
      },
    });
  }
  
}
