import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/** Página privada 2, independiente de la Página 1 (ruta y componente propios). */
@Component({
  selector: 'app-exercise-two',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exercise-two.html',
  styleUrl: './exercise-two.css',
})
export class ExerciseTwo {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
