import { Component, OnInit } from '@angular/core';
import { SportsBettingService } from 'src/app/core/services/sports-betting.service';
import {
  SportsEvent,
  Outcome,
} from 'src/app/core/interfaces/sports-event.interface';

interface FilterCriteria {
  evento?: string;
  local?: string;
  visitante?: string;
  torneo?: string;
  estado?: string;
  fecha?: any;
}

interface UserBet {
  eventName: string;
  selectedOutcomeName: string;
  odds: number;
  stake: number;
  potentialWin: number;
}

@Component({
  selector: 'app-sports-events',
  templateUrl: './sports-events.component.html',
  styleUrls: ['./sports-events.component.scss'],
})
export class SportsEventsComponent implements OnInit {
  sportEvents: SportsEvent[] = [];
  filteredEvents: SportsEvent[] = [];
  isLoading: boolean = true;

  // Filtro con las propiedades opcionales
  filterTerm: FilterCriteria = {};

  selectedBets: UserBet[] = [];

  selectedEventId: string | null = null;
  selectedOutcome: Outcome | null = null;
  betAmount: number = 0;

  constructor(private sportsBettingService: SportsBettingService) {}

  ngOnInit(): void {
    this.sportsBettingService.getSportEvents().subscribe({
      next: (response) => {
        if (response?.data) {
          this.sportEvents = response.data;
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

  onFilterChange(filters: FilterCriteria) {
    this.filterTerm = filters;
    this.applyFilter();
  }

  applyFilter() {
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

  selectEventForBet(eventId: string) {
    this.selectedEventId = eventId;
    this.selectedOutcome = null;
    this.betAmount = 0;
  }

  selectOutcome(outcome: Outcome) {
    this.selectedOutcome = outcome;
  }

  addBet(event: SportsEvent) {
    if (!this.selectedOutcome || this.betAmount <= 0) {
      return;
    }
    const potentialWin = this.betAmount * this.selectedOutcome.odds;
    const userBet: UserBet = {
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

  removeBet(index: number) {
    this.selectedBets.splice(index, 1); // Elimina la apuesta en el índice indicado
  }
}
