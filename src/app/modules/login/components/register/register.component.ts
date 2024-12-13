import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        this.successMessage = 'Usuario registrado exitosamente. Puedes iniciar sesión ahora.';
        this.errorMessage = '';
        // Redirigir al login después de un registro exitoso
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.errorMessage = error.error.message || 'Error al registrar el usuario';
        this.successMessage = '';
      },
    });
  }
}
