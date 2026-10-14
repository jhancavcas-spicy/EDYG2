import { Injectable, computed, signal } from '@angular/core';

/**
 * Estado público del usuario autenticado.
 * A propósito NO incluye la contraseña: nunca debe guardarse
 * ni mostrarse en pantalla.
 */
export interface AuthUser {
  email: string;
  name: string;
}

/** Credenciales de demostración exigidas por el enunciado del Challenge 08. */
const VALID_EMAIL = 'user@mail.com';
const VALID_PASSWORD = '123';

/**
 * Servicio de autenticación. Centraliza TODA la lógica de login/logout
 * usando Angular Signals para el estado reactivo, siguiendo el mismo
 * patrón visto en clase (un signal con el usuario actual, un método
 * para "entrar", uno para "salir" y un computed para saber si hay
 * sesión activa).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Signal privado con el usuario autenticado actual (o null). */
  private readonly currentUserSignal = signal<AuthUser | null>(null);

  /** Signal de solo lectura para que los componentes lean el usuario actual. */
  readonly currentUser = this.currentUserSignal.asReadonly();

  /** Signal derivado: true si hay una sesión activa. */
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  /**
   * Intenta iniciar sesión. Si las credenciales son correctas, actualiza
   * el signal del usuario actual y retorna true. Si son incorrectas,
   * no modifica el estado y retorna false.
   */
  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === VALID_EMAIL && password === VALID_PASSWORD) {
      this.currentUserSignal.set({
        email: normalizedEmail,
        name: 'Usuario Demo',
      });
      return true;
    }

    return false;
  }

  /** Cierra la sesión: limpia el estado del usuario autenticado. */
  logout(): void {
    this.currentUserSignal.set(null);
  }
}
