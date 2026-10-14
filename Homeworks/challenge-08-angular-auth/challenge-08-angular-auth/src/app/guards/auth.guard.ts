import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard funcional de autenticación (mismo patrón visto en clase):
 * si hay sesión activa deja pasar, si no, redirige a /login
 * usando createUrlTree (en vez de solo ocultar elementos en el HTML).
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
