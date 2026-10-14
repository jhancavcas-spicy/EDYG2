import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertComponent } from '../alert/alert.component';

/** Encabezado privado: nombre de la app, correo del usuario y botón "Cerrar sesión". */
@Component({
  selector: 'app-header',
  imports: [AlertComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.auth.user;
  protected readonly loggingOut = signal(false);
  protected readonly error = signal<string | null>(null);

  protected async logout(): Promise<void> {
    this.loggingOut.set(true);
    this.error.set(null);
    const result = await this.auth.logout();
    this.loggingOut.set(false);
    if (result.ok) {
      await this.router.navigateByUrl('/login');
    } else {
      this.error.set(result.message);
    }
  }
}
