import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/** Página de login. Toda la validación de credenciales vive en AuthService. */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';

  readonly errorMessage = signal('');

  ngOnInit(): void {
    // Si ya hay una sesión activa, no tiene sentido mostrar el login de nuevo.
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/exercise-one']);
    }
  }

  entrar(): void {
    this.errorMessage.set('');

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage.set('Email y contraseña son obligatorios.');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage.set('Ingresa un email con un formato válido.');
      return;
    }

    const exito = this.auth.login(this.email, this.password);

    if (exito) {
      this.router.navigate(['/exercise-one']);
    } else {
      this.errorMessage.set('Email o contraseña incorrectos.');
    }
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }
}
