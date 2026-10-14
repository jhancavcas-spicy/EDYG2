import { Injectable } from '@angular/core';
import { serverTimestamp, Timestamp, type DocumentData } from 'firebase/firestore';
import { Observable, defer, map } from 'rxjs';
import { firebaseAuth, firestoreDb } from '../firebase/firebase.config';
import {
  AppError,
  assertFirebaseConfigured,
  createFirestoreCollection,
  toResult,
  type Result,
} from '../firebase/firebase.helpers';
import { TASKS_COLLECTION, type Task, type TaskChanges, type TaskInput } from '../models/task.model';

const toDate = (value: unknown): Date => (value instanceof Timestamp ? value.toDate() : new Date());

/** Convierte un documento de Firestore en una `Task` (el `id` es el del documento). */
const taskFromDoc = (id: string, data: DocumentData): Task => ({
  id,
  title: String(data['title'] ?? ''),
  description: String(data['description'] ?? ''),
  completed: Boolean(data['completed']),
  createdAt: toDate(data['createdAt']),
  updatedAt: toDate(data['updatedAt']),
  userId: String(data['userId'] ?? ''),
});

/**
 * Servicio de TAREAS (independiente de AuthService).
 * Es el ÚNICO lugar donde se consulta Firestore; los componentes no tocan el SDK.
 * Usa el CRUD genérico `createFirestoreCollection` (equivalente al FireStoreService de clase).
 */
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly tasks = createFirestoreCollection<Task>(
    firestoreDb,
    TASKS_COLLECTION,
    taskFromDoc,
  );

  /**
   * Tareas del usuario en TIEMPO REAL, de la más nueva a la más antigua.
   * Filtra por `userId`; las reglas de Firestore además impiden leer las de otros.
   * (Se ordena aquí y no con `orderBy` para no requerir un índice compuesto.)
   */
  getTasksByUser(userId: string): Observable<Task[]> {
    return defer(() => {
      assertFirebaseConfigured();
      return this.tasks.watchAll([['userId', '==', userId]]);
    }).pipe(
      map((list) => [...list].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())),
    );
  }

  /** Crea una tarea para `userId` y devuelve el ID del documento nuevo. */
  createTask(userId: string, taskData: TaskInput): Promise<Result<string>> {
    return toResult(() => {
      this.assertOwnUser(userId);
      return this.tasks.add({
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        completed: false,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });
  }

  /** Modifica una tarea (título, descripción o estado) usando el ID real del documento. */
  updateTask(taskId: string, changes: TaskChanges): Promise<Result<void>> {
    return toResult(() => {
      this.assertSignedIn();
      const data: DocumentData = { updatedAt: serverTimestamp() };
      if (changes.title !== undefined) data['title'] = changes.title.trim();
      if (changes.description !== undefined) data['description'] = changes.description.trim();
      if (changes.completed !== undefined) data['completed'] = changes.completed;
      return this.tasks.update(taskId, data);
    });
  }

  /** Elimina una tarea usando el ID real del documento. */
  deleteTask(taskId: string): Promise<Result<void>> {
    return toResult(() => {
      this.assertSignedIn();
      return this.tasks.remove(taskId);
    });
  }

  /* ---- comprobaciones del lado del cliente (las reglas de Firestore son la barrera real) ---- */

  private assertSignedIn(): string {
    assertFirebaseConfigured();
    const user = firebaseAuth.currentUser;
    if (!user) {
      throw new AppError('app/no-session', 'Debes iniciar sesión para gestionar tus tareas.');
    }
    return user.uid;
  }

  private assertOwnUser(userId: string): void {
    if (this.assertSignedIn() !== userId) {
      throw new AppError('app/wrong-user', 'Solo puedes crear tareas para tu propia cuenta.');
    }
  }
}
