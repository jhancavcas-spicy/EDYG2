import { Injectable, computed, signal } from '@angular/core';

interface MockUser { email: string; password: string; }

const USERS_KEY = 'p2_users';
const SESSION_KEY = 'p2_session';

/** Autenticación mock (sin backend). Los usuarios y la sesión viven en localStorage. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _email = signal<string | null>(localStorage.getItem(SESSION_KEY));
  readonly email = this._email.asReadonly();
  readonly isLogged = computed(() => this._email() !== null);

  constructor() {
    if (!this.users().length) {
      this.save([{ email: 'user@mail.com', password: '123' }]);
    }
  }

  login(email: string, password: string): boolean {
    const ok = this.users().some(
      u => u.email === email.trim().toLowerCase() && u.password === password,
    );
    if (ok) {
      this._email.set(email.trim().toLowerCase());
      localStorage.setItem(SESSION_KEY, this._email()!);
    }
    return ok;
  }

  register(email: string, password: string): string | null {
    const e = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(e)) return 'Correo inválido.';
    if (password.length < 3) return 'La contraseña es muy corta.';
    if (this.users().some(u => u.email === e)) return 'El usuario ya está registrado.';
    this.save([...this.users(), { email: e, password }]);
    return null;
  }

  logout(): void {
    this._email.set(null);
    localStorage.removeItem(SESSION_KEY);
  }

  /** Un usuario "registrado" es el que existe en la lista de usuarios. */
  isRegistered(email: string | null): boolean {
    return !!email && this.users().some(u => u.email === email);
  }

  private users(): MockUser[] {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
  }
  private save(u: MockUser[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(u));
  }
}
