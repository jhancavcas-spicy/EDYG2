import { DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { fail, type Result } from '../firebase/firebase.helpers';
import type { Task, TaskInput } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { useAsyncAction } from './use-async-action';

/**
 * "Custom hook" de Angular para la lógica de tareas.
 *
 * Problema que resuelve: la página de tareas necesitaba (1) escuchar las tareas
 * del usuario actual y reiniciar la escucha si cambia la sesión, (2) mostrar
 * carga/errores, (3) ejecutar crear/editar/completar/eliminar con sus mensajes.
 * Aquí queda todo junto, así el componente solo pinta y reacciona a eventos.
 *
 * Debe llamarse en un contexto de inyección (campo de un componente).
 */
export function useTasks() {
  const auth = inject(AuthService);
  const taskService = inject(TaskService);
  const destroyRef = inject(DestroyRef);

  const tasks = signal<Task[]>([]);
  const loading = signal(true);
  const listError = signal<string | null>(null);
  const actions = useAsyncAction();

  // Cada vez que cambia el usuario, se cancela la escucha anterior y se abre la de su UID.
  toObservable(auth.user)
    .pipe(
      tap(() => {
        loading.set(true);
        listError.set(null);
      }),
      switchMap((user) =>
        user
          ? taskService.getTasksByUser(user.uid).pipe(
              catchError((error: Error) => {
                listError.set(error.message);
                return of<Task[]>([]);
              }),
            )
          : of<Task[]>([]),
      ),
      takeUntilDestroyed(destroyRef),
    )
    .subscribe((list) => {
      tasks.set(list);
      loading.set(false);
    });

  const withUser = <T>(operation: (uid: string) => Promise<Result<T>>): Promise<Result<T>> => {
    const uid = auth.getCurrentUser()?.uid;
    return uid
      ? operation(uid)
      : Promise.resolve(fail('app/no-session', 'Tu sesión expiró. Inicia sesión de nuevo.'));
  };

  return {
    tasks: tasks.asReadonly(),
    loading: loading.asReadonly(),
    listError: listError.asReadonly(),
    /** `true` mientras se guarda, edita o elimina algo. */
    busy: actions.loading,
    actionError: actions.error,
    success: actions.success,
    stats: computed(() => {
      const list = tasks();
      const completed = list.filter((task) => task.completed).length;
      return { total: list.length, completed, pending: list.length - completed };
    }),

    async create(data: TaskInput): Promise<boolean> {
      const result = await withUser((uid) =>
        actions.run(() => taskService.createTask(uid, data), 'Tarea creada correctamente.'),
      );
      return result.ok;
    },

    async update(taskId: string, data: TaskInput): Promise<boolean> {
      const result = await actions.run(
        () => taskService.updateTask(taskId, data),
        'Tarea actualizada correctamente.',
      );
      return result.ok;
    },

    async toggle(task: Task): Promise<boolean> {
      const result = await actions.run(
        () => taskService.updateTask(task.id, { completed: !task.completed }),
        task.completed ? 'Tarea marcada como pendiente.' : 'Tarea marcada como completada.',
      );
      return result.ok;
    },

    async remove(task: Task): Promise<boolean> {
      const result = await actions.run(
        () => taskService.deleteTask(task.id),
        'Tarea eliminada correctamente.',
      );
      return result.ok;
    },

    dismissMessages: actions.reset,
  };
}
