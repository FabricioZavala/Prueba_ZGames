import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Bet } from '../interfaces/bet.interface';



@Injectable({
  providedIn: 'root',
})
export class BetService {
  private apiUrl = `${environment.apiUrl}/bet`;

  constructor(private http: HttpClient) {}

  createBet(bet: Bet): Observable<Bet> {
    return this.http.post<Bet>(`${this.apiUrl}/create`, bet);
  }

  getBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${this.apiUrl}/get-all`);
  }
}
