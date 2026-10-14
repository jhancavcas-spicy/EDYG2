import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  type DocumentData,
  type Firestore,
  type WhereFilterOp,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { isFirebaseConfigured } from './firebase.config';

/* ------------------------------------------------------------------ */
/*  Errores y resultados                                               */
/* ------------------------------------------------------------------ */

/** Error con un mensaje ya listo para mostrar al usuario. */
export class AppError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Resultado de una operación. Los servicios lo devuelven en lugar de lanzar
 * excepciones, así los componentes solo hacen `if (result.ok) ... else result.message`.
 */
export type Result<T> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly code: string; readonly message: string };

export const ok = <T>(data: T): Result<T> => ({ ok: true, data });
export const fail = (code: string, message: string): Result<never> => ({
  ok: false,
  code,
  message,
});

const DEFAULT_ERROR_MESSAGE = 'Ocurrió un error inesperado. Inténtalo de nuevo.';

/** Traducción de los códigos de error de Firebase Auth y Firestore. */
const ERROR_MESSAGES: Record<string, string> = {
  // Authentication
  'auth/invalid-email': 'El correo electrónico no tiene un formato válido.',
  'auth/missing-email': 'Escribe tu correo electrónico.',
  'auth/missing-password': 'Escribe tu contraseña.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/invalid-login-credentials': 'Correo o contraseña incorrectos.',
  'auth/wrong-password': 'Correo o contraseña incorrectos.',
  'auth/user-not-found': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo electrónico.',
  'auth/weak-password': 'La contraseña es muy débil: usa al menos 6 caracteres.',
  'auth/user-disabled': 'Esta cuenta fue deshabilitada.',
  'auth/too-many-requests': 'Demasiados intentos fallidos. Espera unos minutos e inténtalo de nuevo.',
  'auth/network-request-failed':
    'No se pudo conectar con Firebase. Revisa tu conexión a internet e inténtalo de nuevo.',
  'auth/operation-not-allowed':
    'El acceso con correo y contraseña no está activado. Actívalo en Firebase Console → Authentication → Sign-in method.',
  'auth/invalid-api-key': 'La API key de Firebase no es válida. Revisa `environment.ts`.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    'La API key de Firebase no es válida. Revisa `environment.ts`.',
  'auth/configuration-not-found':
    'Authentication no está activado en tu proyecto de Firebase. Actívalo en Firebase Console.',
  'auth/requires-recent-login': 'Por seguridad, vuelve a iniciar sesión para continuar.',
  // Firestore
  'permission-denied':
    'No tienes permiso para esta operación. Revisa que las reglas de Firestore estén publicadas.',
  unauthenticated: 'Tu sesión no es válida. Inicia sesión de nuevo.',
  unavailable: 'Firestore no está disponible ahora mismo. Revisa tu conexión a internet.',
  'deadline-exceeded': 'La operación tardó demasiado. Revisa tu conexión a internet.',
  'not-found': 'No se encontró el documento. Es posible que ya haya sido eliminado.',
  'failed-precondition':
    'Firestore no está listo (¿creaste la base de datos?) o la consulta necesita un índice.',
};

/** Convierte cualquier error en `{ code, message }` con un mensaje en español. */
export function describeError(error: unknown): { code: string; message: string } {
  if (error instanceof AppError) {
    return { code: error.code, message: error.message };
  }
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : 'unknown';
  const message = ERROR_MESSAGES[code];
  if (!message) {
    console.error('[Firebase] Error sin traducción:', error);
  }
  return { code, message: message ?? DEFAULT_ERROR_MESSAGE };
}

/**
 * Ejecuta una operación asíncrona y devuelve un `Result` en vez de lanzar.
 * Es el único lugar donde se traducen los errores de Firebase.
 */
export async function toResult<T>(operation: () => Promise<T>): Promise<Result<T>> {
  try {
    return ok(await operation());
  } catch (error) {
    const { code, message } = describeError(error);
    return fail(code, message);
  }
}

/** Lanza un `AppError` claro si todavía no se pegó la configuración de Firebase. */
export function assertFirebaseConfigured(): void {
  if (!isFirebaseConfigured) {
    throw new AppError(
      'app/firebase-not-configured',
      'Firebase no está configurado. Pega tu configuración en src/environments/environment.ts.',
    );
  }
}

/* ------------------------------------------------------------------ */
/*  Authentication                                                     */
/* ------------------------------------------------------------------ */

/** `onAuthStateChanged` convertido en un Observable (se desuscribe solo). */
export function authState$(auth: Auth): Observable<User | null> {
  return new Observable<User | null>((subscriber) =>
    onAuthStateChanged(
      auth,
      (user) => subscriber.next(user),
      (error) => subscriber.error(error),
    ),
  );
}

/* ------------------------------------------------------------------ */
/*  Firestore: colección genérica (equivale al "FireStoreService" de   */
/*  las diapositivas: init / getAll con filtros / add / update / remove) */
/* ------------------------------------------------------------------ */

/** Filtro de consulta, igual al de las diapositivas: `['ciudad', '==', 'Cali']`. */
export type WhereFilter = readonly [field: string, op: WhereFilterOp, value: unknown];

/**
 * Crea un CRUD reutilizable para CUALQUIER colección de Firestore.
 * Resuelve: (1) escribir `collection()/query()/where()/doc()` en cada servicio,
 * (2) convertir los documentos (id + fechas) a modelos, y (3) traducir los
 * errores de Firebase a mensajes claros.
 */
export function createFirestoreCollection<T>(
  db: Firestore,
  name: string,
  fromDoc: (id: string, data: DocumentData) => T,
) {
  const ref = collection(db, name);

  const buildQuery = (filters: readonly WhereFilter[]) =>
    filters.length
      ? query(ref, ...filters.map(([field, op, value]) => where(field, op, value)))
      : query(ref);

  return {
    /** Escucha la colección en tiempo real (se emite de nuevo ante cada cambio). */
    watchAll(filters: readonly WhereFilter[] = []): Observable<T[]> {
      return new Observable<T[]>((subscriber) =>
        onSnapshot(
          buildQuery(filters),
          (snapshot) =>
            subscriber.next(
              snapshot.docs.map((d) => fromDoc(d.id, d.data({ serverTimestamps: 'estimate' }))),
            ),
          (error) => {
            const { code, message } = describeError(error);
            subscriber.error(new AppError(code, message));
          },
        ),
      );
    },

    /** Lectura única (sin escuchar cambios). */
    async getAll(filters: readonly WhereFilter[] = []): Promise<T[]> {
      const snapshot = await getDocs(buildQuery(filters));
      return snapshot.docs.map((d) => fromDoc(d.id, d.data({ serverTimestamps: 'estimate' })));
    },

    /** Crea un documento y devuelve el ID que generó Firestore. */
    async add(data: DocumentData): Promise<string> {
      return (await addDoc(ref, data)).id;
    },

    /** Modifica un documento usando su ID real de Firestore. */
    update(id: string, changes: DocumentData): Promise<void> {
      return updateDoc(doc(db, name, id), changes);
    },

    /** Elimina un documento usando su ID real de Firestore. */
    remove(id: string): Promise<void> {
      return deleteDoc(doc(db, name, id));
    },
  };
}
