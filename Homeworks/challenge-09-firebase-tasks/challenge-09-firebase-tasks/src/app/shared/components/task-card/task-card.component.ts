import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { Task } from '../../../core/models/task.model';

/** Tarjeta de una tarea: estado, fechas y acciones (completar, editar, eliminar). */
@Component({
  selector: 'app-task-card',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  readonly task = input.required<Task>();
  readonly busy = input(false);
  readonly editing = input(false);

  readonly toggle = output<Task>();
  readonly edit = output<Task>();
  readonly remove = output<Task>();

  protected onToggle(event: Event): void {
    // El valor real lo decide Firestore: se devuelve el checkbox a su estado actual y
    // este cambia cuando llega la actualización. Si el guardado falla, no queda desincronizado.
    (event.target as HTMLInputElement).checked = this.task().completed;
    this.toggle.emit(this.task());
  }
}
