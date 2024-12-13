import { Component, OnInit } from '@angular/core';
import { SportsBettingService } from 'src/app/core/services/sports-betting.service';
import {
  SportsEvent,
  Outcome,
  FilterCriteria,
} from 'src/app/core/interfaces/sports-event.interface';
import { Bet } from 'src/app/core/interfaces/bet.interface';



@Component({
  selector: 'app-sports-events',
  templateUrl: './sports-events.component.html',
  styleUrls: ['./sports-events.component.scss'],
})
export class SportsEventsComponent implements OnInit {
  sportEvents: SportsEvent[] = [];
  filteredEvents: SportsEvent[] = [];
  isLoading: boolean = true;

  filterTerm: FilterCriteria = {};

  selectedBets: Bet[] = [];
  selectedEventId: string | null = null;
  selectedOutcome: Outcome | null = null;
  betAmount: number = 0;

  constructor(private sportsBettingService: SportsBettingService) {}

  ngOnInit(): void {
    this.fetchSportsEvents();
  }

  fetchSportsEvents(): void {
    const localData = localStorage.getItem('sportsEvents');
    if (localData) {
      console.log('Using data from localStorage');
      this.sportEvents = JSON.parse(localData);
      this.applyFilter();
    } else {
      console.log('Fetching data from API');
      this.sportsBettingService.getSportEvents().subscribe({
        next: (response) => {
          if (response?.data) {
            this.sportEvents = response.data;
            localStorage.setItem('sportsEvents', JSON.stringify(response.data));
            this.applyFilter();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching sport events:', error);
          this.isLoading = false;
        },
      });
    }
  }

  onFilterChange(filters: FilterCriteria): void {
    this.filterTerm = filters;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredEvents = this.sportEvents.filter((evt) => {
      const eventoName = (evt.sportEventName?.es || '').toLowerCase();
      const localName = (
        evt.competitorHome?.competitorName?.es || ''
      ).toLowerCase();
      const visitanteName = (
        evt.competitorAway?.competitorName?.es || ''
      ).toLowerCase();
      const torneoName = (
        evt.tournament?.tournamentName?.es || ''
      ).toLowerCase();
      const estadoName = (evt.eventStatus?.matchStatus?.es || '').toLowerCase();
      const fechaEvento = evt.scheduled?.split('T')[0];
      const filtroFecha = this.filterTerm.fecha
        ? new Date(this.filterTerm.fecha)
        : null;

      return (
        (!this.filterTerm.evento ||
          eventoName.includes(this.filterTerm.evento.toLowerCase())) &&
        (!this.filterTerm.local ||
          localName.includes(this.filterTerm.local.toLowerCase())) &&
        (!this.filterTerm.visitante ||
          visitanteName.includes(this.filterTerm.visitante.toLowerCase())) &&
        (!this.filterTerm.torneo ||
          torneoName.includes(this.filterTerm.torneo.toLowerCase())) &&
        (!this.filterTerm.estado ||
          estadoName === this.filterTerm.estado.toLowerCase()) &&
        (!filtroFecha ||
          new Date(fechaEvento).getTime() === filtroFecha.getTime())
      );
    });
  }

  selectEventForBet(eventId: string): void {
    this.selectedEventId = eventId;
    this.selectedOutcome = null;
    this.betAmount = 0;
  }

  selectOutcome(outcome: Outcome): void {
    this.selectedOutcome = outcome;
  }

  addBet(event: SportsEvent): void {
    if (!this.selectedOutcome || this.betAmount <= 0) {
      return;
    }
    const potentialWin = this.betAmount * this.selectedOutcome.odds;
    const userBet: Bet = {
      userId: 'USER_ID', // Replace with actual user ID if available
      eventId: event.eventId,
      eventName: event.sportEventName.es,
      selectedOutcomeName: this.selectedOutcome.outcomeName.es,
      odds: this.selectedOutcome.odds,
      stake: this.betAmount,
      potentialWin: potentialWin,
    };
    this.selectedBets.push(userBet);

    this.selectedEventId = null;
    this.selectedOutcome = null;
    this.betAmount = 0;
  }

  removeBet(index: number): void {
    this.selectedBets.splice(index, 1);
  }

  sendBet(bet: Bet): void {
    console.log('Sending bet to backend:', bet);

    this.sportsBettingService.placeBet(bet).subscribe({
      next: (response) => {
        console.log('Bet successfully sent:', response);
        this.selectedBets = this.selectedBets.filter((b) => b !== bet);
      },
      error: (error) => {
        console.error('Error sending bet:', error);
      },
    });
  }
}
