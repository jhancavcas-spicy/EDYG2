import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  mode = signal<'login' | 'register'>('login');
  error = signal('');

  submit(): void {
    this.error.set('');
    if (this.mode() === 'register') {
      const err = this.auth.register(this.email, this.password);
      if (err) return this.error.set(err);
    }
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/explorador']);
    } else {
      this.error.set('Credenciales incorrectas.');
    }
  }

  toggle(): void {
    this.mode.update(m => (m === 'login' ? 'register' : 'login'));
    this.error.set('');
  }
}
