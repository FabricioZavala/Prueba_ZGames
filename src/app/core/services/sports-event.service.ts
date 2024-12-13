import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SportsEvent } from '../interfaces/sports-event.interface';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SportsEventService {
  private apiUrl = `${environment.apiUrl}/sport-event`;

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<SportsEvent[]> {
    return this.http.get<SportsEvent[]>(`${this.apiUrl}/get-all`);
  }

  getEventById(eventId: string): Observable<SportsEvent> {
    return this.http.get<SportsEvent>(`${this.apiUrl}/get/${eventId}`);
  }

  createEvent(event: SportsEvent): Observable<SportsEvent> {
    return this.http.post<SportsEvent>(`${this.apiUrl}/create`, event);
  }
}
