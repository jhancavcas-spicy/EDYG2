import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  untracked,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TASK_LIMITS, type Task, type TaskInput } from '../../../core/models/task.model';
import { notBlank } from '../../validators/form-validators';

/** Formulario único para CREAR una tarea o EDITAR la que llega en `task`. */
@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  /** Tarea en edición; `null` = modo "crear". */
  readonly task = input<Task | null>(null);
  readonly saving = input(false);

  readonly save = output<TaskInput>();
  readonly cancelEdit = output<void>();

  protected readonly limits = TASK_LIMITS;
  protected readonly isEditing = computed(() => this.task() !== null);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, notBlank, Validators.maxLength(TASK_LIMITS.titleMax)]],
    description: ['', [Validators.maxLength(TASK_LIMITS.descriptionMax)]],
  });

  constructor() {
    // Al elegir "Editar" se cargan los datos de la tarea; al cancelar se limpia el formulario.
    effect(() => {
      const current = this.task();
      untracked(() => {
        if (current) {
          this.form.setValue({ title: current.title, description: current.description });
        } else {
          this.reset();
        }
      });
    });
  }

  /** Limpia el formulario (lo usa la página cuando la operación termina bien). */
  reset(): void {
    this.form.reset({ title: '', description: '' });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description } = this.form.getRawValue();
    this.save.emit({ title: title.trim(), description: description.trim() });
  }
}
