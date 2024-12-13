import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, User } from '../interfaces/user.interface';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(user: { username: string; email: string; password: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${this.apiUrl}/create`, user, httpOptions);
  }

  // Método para iniciar sesión
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, httpOptions);
  }

  // Guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Eliminar el token de localStorage (logout)
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
