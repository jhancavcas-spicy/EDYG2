import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Página privada 1. El contenido de ejemplo es una demostración
 * reemplazable (el enunciado pide no inventar cuál era "el ejercicio
 * anterior" si las diapositivas no lo especifican).
 */
@Component({
  selector: 'app-exercise-one',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exercise-one.html',
  styleUrl: './exercise-one.css',
})
export class ExerciseOne {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
