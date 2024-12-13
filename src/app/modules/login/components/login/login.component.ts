import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('User logged in:', response);
        this.authService.saveToken(response.token);
        this.errorMessage = '';
        // Redirigir a la página de eventos deportivos después de iniciar sesión
        this.router.navigate(['/sports-events']);
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.errorMessage = error.error.message || 'Error al iniciar sesión';
      },
    });
  }
}
