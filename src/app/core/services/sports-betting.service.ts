import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SportsEvent } from '../interfaces/sports-event.interface';

@Injectable({
  providedIn: 'root',
})
export class SportsBettingService {
  private apiUrl = 'https://betapi.zgameslatam.com/v1/api/sport-events/prematch-highlights?sportId=sr:sport:1&statusSportEvent=NotStarted&marketId=1&limit=10';

  constructor(private http: HttpClient) {}

  getSportEvents(): Observable<{ data: SportsEvent[] }> {
    // Especifica que la respuesta tiene una propiedad `data` que es un array de `SportsEvent`
    return this.http.get<{ data: SportsEvent[] }>(this.apiUrl);
  }
}
