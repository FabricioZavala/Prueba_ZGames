import { Component, OnInit } from '@angular/core';
import { SportsBettingService } from 'src/app/core/services/sports-betting.service';
import { SportsEvent, Outcome } from 'src/app/core/interfaces/sports-event.interface';



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
  filterTerm: string = '';
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

  onFilterChange(term: string) {
    this.filterTerm = term;
    this.applyFilter();
  }

  applyFilter() {
    if (!this.filterTerm) {
      this.filteredEvents = this.sportEvents;
    } else {
      const lowerTerm = this.filterTerm.toLowerCase();
      this.filteredEvents = this.sportEvents.filter(evt => {
        const homeTeam = evt.competitorHome?.competitorName?.es?.toLowerCase() || '';
        const awayTeam = evt.competitorAway?.competitorName?.es?.toLowerCase() || '';
        const tournament = evt.tournament?.tournamentName?.es?.toLowerCase() || '';
        return homeTeam.includes(lowerTerm) || awayTeam.includes(lowerTerm) || tournament.includes(lowerTerm);
      });
    }
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
}
