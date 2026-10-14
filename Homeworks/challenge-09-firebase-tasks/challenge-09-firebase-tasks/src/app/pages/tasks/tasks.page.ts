import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isFirebaseConfigured } from '../../core/firebase/firebase.config';
import { useTasks } from '../../core/hooks/use-tasks';
import type { Task, TaskInput } from '../../core/models/task.model';
import { AuthService } from '../../core/services/auth.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { ConfigNoticeComponent } from '../../shared/components/config-notice/config-notice.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';
import { TaskFormComponent } from '../../shared/components/task-form/task-form.component';

type TaskFilter = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-tasks-page',
  imports: [
    AlertComponent,
    AppHeaderComponent,
    ConfigNoticeComponent,
    ConfirmDialogComponent,
    TaskCardComponent,
    TaskFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export class TasksPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly taskForm = viewChild(TaskFormComponent);

  protected readonly firebaseConfigured = isFirebaseConfigured;
  /** Toda la lógica de Firebase vive en el hook; esta página solo pinta y reacciona. */
  protected readonly t = useTasks();

  protected readonly editing = signal<Task | null>(null);
  protected readonly pendingDelete = signal<Task | null>(null);
  protected readonly filter = signal<TaskFilter>('all');
  protected readonly filters: readonly { value: TaskFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'completed', label: 'Completadas' },
  ];

  protected readonly visibleTasks = computed(() => {
    const filter = this.filter();
    return this.t
      .tasks()
      .filter((task) => filter === 'all' || (filter === 'completed') === task.completed);
  });

  constructor() {
    // Si la sesión termina (p. ej. se cerró en otra pestaña), se vuelve a /login.
    effect(() => {
      if (this.auth.ready() && !this.auth.user()) {
        void this.router.navigateByUrl('/login');
      }
    });
  }

  protected count(filter: TaskFilter): number {
    const stats = this.t.stats();
    return filter === 'all' ? stats.total : filter === 'completed' ? stats.completed : stats.pending;
  }

  protected async onSave(data: TaskInput): Promise<void> {
    const editing = this.editing();
    const saved = editing ? await this.t.update(editing.id, data) : await this.t.create(data);
    if (saved) {
      this.editing.set(null);
      this.taskForm()?.reset();
    }
  }

  protected startEdit(task: Task): void {
    this.t.dismissMessages();
    this.editing.set(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected cancelEdit(): void {
    this.editing.set(null);
  }

  protected async confirmDelete(): Promise<void> {
    const task = this.pendingDelete();
    if (!task) return;
    const deleted = await this.t.remove(task);
    this.pendingDelete.set(null);
    if (deleted && this.editing()?.id === task.id) {
      this.editing.set(null);
    }
  }
}
