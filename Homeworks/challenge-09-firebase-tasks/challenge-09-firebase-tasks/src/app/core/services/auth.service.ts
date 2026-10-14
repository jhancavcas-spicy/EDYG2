import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase.config';
import {
  assertFirebaseConfigured,
  authState$,
  toResult,
  type Result,
} from '../firebase/firebase.helpers';
import { useAuthState } from '../hooks/use-auth-state';

/**
 * Servicio de AUTENTICACIÓN (independiente del de tareas).
 * Centraliza Register, Login y Logout con Firebase Authentication.
 * Nunca guarda contraseñas: Firebase las gestiona y la sesión la mantiene el SDK.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly state = useAuthState(firebaseAuth);

  /** Usuario actual (signal). `null` si no hay sesión. */
  readonly user = this.state.user;
  /** `true` cuando Firebase ya terminó de comprobar si hay una sesión guardada. */
  readonly ready = this.state.ready;
  readonly isAuthenticated = this.state.isAuthenticated;
  /** Mecanismo reactivo alternativo (RxJS) para quien prefiera Observables. */
  readonly authState$ = authState$(firebaseAuth);

  /** Espera a que Firebase informe el estado inicial de la sesión. */
  whenReady(): Promise<void> {
    return this.state.whenReady();
  }

  /** Usuario autenticado en este instante (lectura síncrona del SDK). */
  getCurrentUser(): User | null {
    return firebaseAuth.currentUser;
  }

  /** Crea la cuenta con correo y contraseña. Firebase inicia la sesión automáticamente. */
  register(email: string, password: string): Promise<Result<User>> {
    return toResult(async () => {
      assertFirebaseConfigured();
      const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return credential.user;
    });
  }

  /** Inicia sesión con correo y contraseña. */
  login(email: string, password: string): Promise<Result<User>> {
    return toResult(async () => {
      assertFirebaseConfigured();
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return credential.user;
    });
  }

  /** Cierra la sesión actual. */
  logout(): Promise<Result<void>> {
    return toResult(async () => {
      await signOut(firebaseAuth);
    });
  }
}
