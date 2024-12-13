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
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, httpOptions).pipe(
      tap((response: AuthResponse) => {
        // Guardar los datos del usuario en localStorage
        this.saveUser(response);
      })
    );
  }

  // Guardar el usuario en localStorage
  saveUser(userData: AuthResponse): void {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('Usuario guardado en localStorage');
  }

  // Obtener los datos del usuario desde localStorage
  getUser(): AuthResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('user'); // Elimina los datos del usuario
    console.log('Sesión cerrada');
  }
}
