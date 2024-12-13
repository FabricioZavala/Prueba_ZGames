import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { SportsEvent } from '../interfaces/sports-event.interface';
import { environment } from 'src/enviroments/enviroment';
import { Bet } from '../interfaces/bet.interface';



@Injectable({
  providedIn: 'root',
})
export class SportsBettingService {
  private sportsApiUrl = `https://betapi.zgameslatam.com/v1/api/sport-events/prematch-highlights?sportId=sr:sport:1&statusSportEvent=NotStarted&marketId=1&limit=10`; // URL de consumo
  private apiUrl = `${environment.apiUrl}/bet`;
  constructor(private http: HttpClient) {}

  getSportEvents(): Observable<{ data: SportsEvent[] }> {
    console.log('Fetching sports events from API...');
    return this.http.get<{ data: SportsEvent[] }>(this.sportsApiUrl);
  }
  
  getStoredSportEvents(): SportsEvent[] {
    const storedEvents = localStorage.getItem('sportsEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }
  syncEventsWithBackend(): Observable<any> {
    const events = this.getStoredSportEvents();
    if (events.length === 0) {
      console.warn('No events in localStorage to sync');
      return of({ message: 'No events to sync' });
    }

    console.log('Syncing events to backend:', events);
    return this.http.post(`${this.apiUrl}/sync-events`, { events });
  }

  placeBet(bet: Bet): Observable<any> {
    console.log('Placing bet:', bet);
    return this.http.post(`${this.apiUrl}/create`, bet);
  }
}
