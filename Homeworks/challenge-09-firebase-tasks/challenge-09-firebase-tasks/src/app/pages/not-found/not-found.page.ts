import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="auth-page">
      <div class="auth-card text-center">
        <p class="display-1 fw-bold text-primary mb-0">404</p>
        <h1 class="h4 fw-bold">Página no encontrada</h1>
        <p class="text-secondary">La dirección que buscas no existe o fue movida.</p>
        <a routerLink="/tasks" class="btn btn-primary">Ir a mis tareas</a>
      </div>
    </main>
  `,
})
export class NotFoundPage {}
