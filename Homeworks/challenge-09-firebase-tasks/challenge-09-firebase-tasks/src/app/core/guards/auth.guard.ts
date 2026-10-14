import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protege las rutas privadas (/tasks).
 * Primero ESPERA a que Firebase termine de recuperar la sesión; si no lo hiciera,
 * un usuario autenticado sería enviado a /login al recargar la página.
 */
export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.whenReady();
  return auth.getCurrentUser() ? true : router.createUrlTree(['/login']);
};

/** Para /login y /register: si ya hay sesión, se envía directamente a /tasks. */
export const guestGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.whenReady();
  return auth.getCurrentUser() ? router.createUrlTree(['/tasks']) : true;
};
