import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../interfaces/user.interface';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  register(user: { username: string; email: string; password: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${this.apiUrl}/create`, user, httpOptions);
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, httpOptions).pipe(
      tap((response: AuthResponse) => {
        this.saveUser(response);
      })
    );
  }

  saveUser(userData: AuthResponse): void {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUser(): AuthResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
