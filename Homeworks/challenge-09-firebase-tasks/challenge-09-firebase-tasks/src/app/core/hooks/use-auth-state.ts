import { DestroyRef, computed, inject, signal } from '@angular/core';
import type { Auth, User } from 'firebase/auth';
import { authState$ } from '../firebase/firebase.helpers';

/**
 * "Custom hook" de Angular: observa el estado de autenticación de Firebase.
 *
 * Problema que resuelve: Firebase tarda un instante en recuperar la sesión
 * guardada. Durante ese tiempo `user` es `null` aunque la persona SÍ esté
 * autenticada, y un guard que no espere redirigiría a /login por error.
 * Este hook expone, además del usuario, un indicador `ready` y la promesa
 * `whenReady()` que el guard espera antes de decidir.
 *
 * Debe llamarse en un contexto de inyección (campo de una clase inyectable).
 */
export function useAuthState(auth: Auth) {
  const user = signal<User | null>(null);
  const ready = signal(false);

  let markReady!: () => void;
  const readyPromise = new Promise<void>((resolve) => (markReady = resolve));

  const subscription = authState$(auth).subscribe({
    next: (current) => {
      user.set(current);
      ready.set(true);
      markReady();
    },
    error: () => {
      user.set(null);
      ready.set(true);
      markReady();
    },
  });
  inject(DestroyRef).onDestroy(() => subscription.unsubscribe());

  return {
    user: user.asReadonly(),
    ready: ready.asReadonly(),
    isAuthenticated: computed(() => user() !== null),
    /** Se resuelve cuando Firebase ya informó si hay sesión o no. */
    whenReady: () => readyPromise,
  };
}
