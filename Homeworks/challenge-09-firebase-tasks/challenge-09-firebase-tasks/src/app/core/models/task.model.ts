/** Nombre de la colección de Firestore donde se guardan las tareas. */
export const TASKS_COLLECTION = 'tasks';

/** Límites de longitud. Deben coincidir con los de `firestore.rules`. */
export const TASK_LIMITS = {
  titleMax: 120,
  descriptionMax: 500,
} as const;

/** Tarea tal como la usa la interfaz (las fechas ya son `Date`). */
export interface Task {
  /** ID del documento generado por Firestore (no es un índice de array). */
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  /** UID del usuario propietario (Firebase Authentication). */
  userId: string;
}

/** Datos que el usuario escribe en el formulario. */
export interface TaskInput {
  title: string;
  description: string;
}

/** Campos que se pueden modificar en una tarea existente. */
export type TaskChanges = Partial<Pick<Task, 'title' | 'description' | 'completed'>>;
