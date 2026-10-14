# Challenge 08 — Angular: Login, Services, Signals y Rutas Privadas

## Objetivo

Construir un proyecto Angular con una página de login simulada, un `AuthService` basado en Signals, dos páginas privadas protegidas por un `authGuard`, y una página 404 — siguiendo el enfoque de Services, Signals, Routing y Guards explicado en clase.

## Conceptos

### ¿Qué es un Service en Angular?

Una clase marcada con `@Injectable({ providedIn: 'root' })` que permite compartir estado y lógica entre varios componentes sin "prop drilling" (pasar datos manualmente de componente padre a hijo a nieto). Aquí, `AuthService` es el único lugar que sabe cómo validar credenciales y guardar quién está logueado.

### ¿Para qué se usan los Signals?

Son contenedores de estado reactivo: cuando un signal cambia (`.set(...)`), cualquier componente que lo esté usando en su plantilla se actualiza automáticamente, sin `ngOnChanges` ni suscripciones manuales. Se leen llamándolos como función: `auth.currentUser()`.

## Cómo funciona el servicio de autenticación

`src/app/services/auth.service.ts`:

- `currentUserSignal` — signal privado con el usuario logueado (`{ email, name }`) o `null`.
- `currentUser` — versión de solo lectura del signal anterior, para que los componentes puedan leerlo (pero no modificarlo directamente).
- `isAuthenticated` — signal **computado**: `true` si `currentUserSignal()` no es `null`.
- `login(email, password)` — compara contra las credenciales válidas (`user@mail.com` / `123`). Si coinciden, actualiza el signal y retorna `true`; si no, no toca el estado y retorna `false`.
- `logout()` — pone el signal de usuario en `null`.

La contraseña **nunca** se guarda en el estado público ni se muestra en pantalla — solo se usa para la comparación dentro de `login()`.

## Cómo funciona el guard

`src/app/guards/auth.guard.ts` es un guard funcional (`CanActivateFn`), el mismo patrón visto en clase:

```ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
```

Se aplica en `app.routes.ts` con `canActivate: [authGuard]` en las rutas `/exercise-one` y `/exercise-two`. La protección ocurre en el router, no ocultando botones en el HTML.

## Cómo se configuraron las rutas

`src/app/app.routes.ts`:

| Ruta | Componente | Protegida |
|---|---|---|
| `/` | `Home` | No |
| `/login` | `Login` | No |
| `/exercise-one` | `ExerciseOne` | Sí (`authGuard`) |
| `/exercise-two` | `ExerciseTwo` | Sí (`authGuard`) |
| `**` | `NotFound` | No (siempre al final) |

## Estructura del proyecto

```
src/app/
├── services/
│   └── auth.service.ts
├── guards/
│   └── auth.guard.ts
├── pages/
│   ├── login/
│   ├── home/
│   ├── exercise-one/
│   ├── exercise-two/
│   └── not-found/
├── app.routes.ts
├── app.config.ts
├── app.ts / app.html / app.css
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

(equivalente a `ng serve`). Abre `http://localhost:4200/`.

## Cómo iniciar sesión

Ve a `/login` e ingresa:

- Email: `user@mail.com`
- Password: `123`

Credenciales incorrectas muestran un mensaje de error y te mantienen en `/login`. Al iniciar sesión correctamente, te lleva a `/exercise-one`.

## Cómo probar el cierre de sesión

Desde `/exercise-one` o `/exercise-two`, pulsa "Cerrar sesión". Esto llama a `auth.logout()` y navega a `/login`. Si después intentas entrar directamente a `/exercise-one` o `/exercise-two` por la URL, el guard te redirige de nuevo a `/login`.

**Importante:** estas son credenciales de demostración, pensadas solo para este ejercicio académico. El proyecto no usa backend ni almacena nada de forma persistente — al recargar la página se pierde la sesión.
