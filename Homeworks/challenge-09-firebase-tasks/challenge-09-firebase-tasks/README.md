# Challenge 09 — Angular + Firebase: aplicación de tareas (TaskFlow)

Proyecto de **Estructuras de Datos II** (Clase 09 — *Firebase n Styling*).
Convierte el "Fake Login" en una aplicación con **autenticación real con Firebase**, una **app de tareas** con Cloud Firestore, servicios separados, lógica reutilizable de Firebase y estilos con **Bootstrap + Sass**.

> **Estado de verificación (léelo antes de entregar):** el proyecto compila sin errores y la interfaz se probó en un navegador real, **pero con Firebase simulado** (Auth y Firestore falsos), porque desde el entorno donde se generó no hay acceso a tu proyecto de Firebase ni al emulador. **La conexión con tu Firebase real y las reglas de Firestore no se han podido probar**: debes hacerlo tú con la lista de la sección 15.

---

## 1. Objetivo del Challenge 09

| Requisito del enunciado | Dónde está |
|---|---|
| Login, Register y Logout con Firebase | `core/services/auth.service.ts`, páginas `login` y `register`, `shared/components/app-header` |
| Páginas Login y Register con routing | `app.routes.ts`, `pages/login`, `pages/register` |
| App de tareas: crear, editar, eliminar y marcar hecha/pendiente | `pages/tasks`, `shared/components/task-form`, `task-card`, `confirm-dialog` |
| Un servicio para los datos de tareas | `core/services/task.service.ts` |
| Otro servicio distinto para Login/Register | `core/services/auth.service.ts` |
| "Custom hooks" para la lógica de Firebase | `core/hooks/*` + `core/firebase/firebase.helpers.ts` (ver sección 12) |
| Librería CSS y Sass | Bootstrap 5.3 + `src/styles/*.scss` |

**Angular y los "custom hooks":** los *custom hooks* son un concepto de **React**. Las diapositivas de la clase 9 también explican el ciclo de vida de componentes de **Angular** (`angular.dev`), y el proyecto base es Angular, así que se mantuvo Angular. La adaptación idiomática es una función `use…()` que se llama en el contexto de inyección y devuelve *signals* (ver sección 12). Si tu profesor espera literalmente React Hooks, habría que migrar el proyecto a React; avísame y se hace.

## 2. Arquitectura

```
src/
├── environments/environment.ts        ← AQUÍ pegas la configuración de Firebase
├── styles.scss                        ← punto de entrada de Sass
├── styles/
│   ├── _variables.scss                ← colores, bordes, espacios, breakpoints
│   ├── _functions.scss                ← rem(), space()
│   ├── _mixins.scss                   ← respond-up/down, surface, badge-variant
│   ├── _bootstrap.scss                ← Bootstrap personalizado con nuestras variables
│   ├── _base.scss                     ← estilos globales
│   └── _components.scss               ← marca, páginas de acceso, etiquetas de estado
└── app/
    ├── app.ts / app.config.ts / app.routes.ts
    ├── core/
    │   ├── firebase/
    │   │   ├── firebase.config.ts     ← inicializa Firebase UNA sola vez (auth + firestore)
    │   │   └── firebase.helpers.ts    ← errores en español, Result, authState$, CRUD genérico de colección
    │   ├── hooks/                     ← "custom hooks" de Angular
    │   │   ├── use-auth-state.ts      ← observa la sesión (user, ready, whenReady)
    │   │   ├── use-async-action.ts    ← loading / error / success de cualquier acción
    │   │   └── use-tasks.ts           ← tareas en tiempo real + crear/editar/completar/eliminar
    │   ├── services/
    │   │   ├── auth.service.ts        ← register / login / logout / getCurrentUser
    │   │   └── task.service.ts        ← getTasksByUser / createTask / updateTask / deleteTask
    │   ├── guards/auth.guard.ts       ← authGuard (/tasks) y guestGuard (/login, /register)
    │   └── models/task.model.ts
    ├── pages/ login · register · tasks · not-found
    └── shared/
        ├── components/ alert · app-header · task-form · task-card · confirm-dialog · config-notice
        └── validators/form-validators.ts
firestore.rules · firebase.json · firestore.indexes.json
```

Separación de responsabilidades: **los componentes no tocan el SDK de Firebase**. Solo `AuthService` y `TaskService` (apoyados en `firebase.helpers.ts`) lo hacen.

Versiones: Angular 21, Firebase SDK 12, Bootstrap 5.3, Sass. **Requiere Node `^20.19`, `^22.12` o `>=24`** (compruébalo con `node -v`).

## 3. Configurar Firebase (paso a paso)

1. Entra a <https://console.firebase.google.com/> e inicia sesión con tu cuenta de Google.
2. **Agregar proyecto** → ponle un nombre (p. ej. `challenge-09-tasks`) → Google Analytics es opcional → **Crear proyecto**.
3. **Registrar la app web:** en la pantalla principal del proyecto pulsa el icono **`</>` (Web)** → escribe un apodo → **Registrar app**. (No necesitas Firebase Hosting.)
4. Firebase te muestra un bloque `firebaseConfig`. Si lo cierras: ⚙ **Configuración del proyecto → General → Tus apps → Configuración del SDK → "Config"**.
5. Abre `src/environments/environment.ts` y copia estos 6 valores (uno por uno):

| Campo en `environment.ts` | Lo copias de `firebaseConfig` |
|---|---|
| `apiKey` | `apiKey` |
| `authDomain` | `authDomain` |
| `projectId` | `projectId` |
| `storageBucket` | `storageBucket` |
| `messagingSenderId` | `messagingSenderId` |
| `appId` | `appId` |

> Mientras haya valores `TU_…`, la app muestra un aviso amarillo y no intenta conectarse. La configuración web de Firebase **no es un secreto**; lo que protege tus datos son las reglas de seguridad (sección 14). No incluyas credenciales de administrador ni cuentas de servicio en el proyecto.

## 4. Activar Authentication (Email/Password)

1. Menú izquierdo **Compilación (Build) → Authentication → Comenzar**.
2. Pestaña **Método de acceso (Sign-in method)** → **Correo electrónico/contraseña** → activa **Habilitar** → **Guardar**. (No hace falta activar "Vínculo de correo electrónico").

## 5. Crear Cloud Firestore

1. **Compilación → Firestore Database → Crear base de datos.**
2. Elige la ubicación más cercana (p. ej. `nam5`/`us-east1`; no se puede cambiar después).
3. Elige **modo de producción** (bloquea todo hasta que publiques las reglas de la sección 14) → **Crear**.

## 6. Instalar dependencias

```bash
cd challenge-09-firebase-tasks
npm install
```

## 7. Ejecutar el proyecto

```bash
npm start
```

Abre <http://localhost:4200>. Otros comandos (todos existen en `package.json`):

```bash
npm run build   # compila a dist/challenge-09-firebase-tasks
npm run watch   # compilación en modo desarrollo con observador
```

## 8. Registrarse e iniciar sesión

1. Ve a **Regístrate** (`/register`), escribe correo, contraseña (mínimo 6) y confírmala → **Crear cuenta**.
2. Firebase crea el usuario e inicia la sesión; la app te lleva a `/tasks`.
3. En otra ocasión usa `/login` con ese correo y contraseña.
4. Verifica en Firebase Console → Authentication → Users que apareció tu correo.

## 9. Cerrar sesión

Botón **Cerrar sesión** en el encabezado: ejecuta `AuthService.logout()` y te devuelve a `/login`. Si luego escribes `/tasks` en la barra, el guard te redirige a `/login`.

## 10. Usar las tareas

- **Crear:** formulario "Nueva tarea" (título obligatorio, descripción opcional) → **Crear tarea**.
- **Completar / reabrir:** checkbox de la tarjeta (se guarda en Firestore; la tarjeta se atenúa y el título se tacha).
- **Editar:** **Editar** carga los datos en el formulario → cambia título/descripción → **Guardar cambios** (o **Cancelar**).
- **Eliminar:** **Eliminar** abre una confirmación; solo al aceptar se borra.
- Los filtros **Todas / Pendientes / Completadas** y los contadores se actualizan en tiempo real.

## 11. `AuthService` y `TaskService`

**`AuthService`** (solo autenticación):
`register(email, password)` → `createUserWithEmailAndPassword` · `login(email, password)` → `signInWithEmailAndPassword` · `logout()` → `signOut` · `getCurrentUser()` · estado reactivo: `user`, `ready`, `isAuthenticated` (signals) y `authState$` (Observable, basado en `onAuthStateChanged`).
Cada método devuelve un `Result` (`{ ok: true, data }` o `{ ok: false, code, message }`) con el mensaje de error ya traducido al español. No guarda contraseñas en ningún sitio (Firebase las gestiona).

**`TaskService`** (solo datos de tareas, independiente del anterior):
`getTasksByUser(userId)` (tiempo real con `onSnapshot`, filtrado por `userId`) · `createTask(userId, data)` · `updateTask(taskId, changes)` · `deleteTask(taskId)`.
El `id` de cada tarea es el **ID del documento de Firestore**; `createdAt`/`updatedAt` los genera el servidor (`serverTimestamp()`); `userId` es el UID del dueño.

## 12. Lógica reutilizable de Firebase ("custom hooks" en Angular)

| Pieza | Qué problema resuelve |
|---|---|
| `useAuthState(auth)` | Firebase tarda un instante en recuperar la sesión guardada. Expone `user`, `ready` y `whenReady()`; el guard espera a `whenReady()` para no redirigir a `/login` por error al recargar. |
| `useAsyncAction()` | Cada formulario/botón repetía su `loading`, `error`, `success` y try/catch. Ahora `action.run(() => servicio.metodo())` los gestiona (y limpia el mensaje de éxito solo). |
| `useTasks()` | Reúne escucha en tiempo real de las tareas del usuario actual (se reinicia si cambia la sesión), estado de carga/error, estadísticas y las acciones crear/editar/completar/eliminar. La página solo pinta y reacciona a eventos. |
| `createFirestoreCollection(db, nombre, fromDoc)` | Equivale al **FireStoreService** de las diapositivas (`getAll` con filtros `[campo, op, valor]`, `add`, `update`, `remove`) pero reutilizable para cualquier colección y con `watchAll` en tiempo real. Evita repetir `collection/query/where/doc` y la conversión de documentos/fechas. |
| `toResult()` / `describeError()` | Único punto donde se traducen los errores de Firebase (credenciales incorrectas, correo repetido, sin red, permisos…). |
| `authState$()` | `onAuthStateChanged` convertido en Observable que se desuscribe solo. |

Son funciones `use…` porque Angular no tiene React Hooks: deben llamarse en un **contexto de inyección** (campo de un componente o servicio) y devuelven *signals* que la plantilla lee directamente.

## 13. Sass y Bootstrap

- **Bootstrap 5.3** da formularios, botones, tarjetas, alertas, `nav-pills`, modal y rejilla responsive. Se compila desde Sass (`styles/_bootstrap.scss`) **sobrescribiendo sus variables** (`$primary`, `$input-bg`, `$border-radius`, …) para que la apariencia sea propia. Iconos: `bootstrap-icons`.
- **Sass** (`src/styles/`) aporta:
  - **Variables** (`_variables.scss`): colores, radios, sombras, breakpoints; cambiar un valor cambia toda la app.
  - **Funciones** (`_functions.scss`): `rem(14)` (px→rem con `math.div`) y `space(4)` (múltiplos del espaciado base).
  - **Mixins** (`_mixins.scss`): `respond-up/down`, `surface` (tarjeta), `badge-variant` (etiqueta a partir de un color).
  - **Bucle `@each`** (`_components.scss`): genera `.status-badge--pending` y `--completed` desde un mapa de colores.
  - **Anidamiento moderado** con `&--modificador` y `&__elemento`, y `@use` para organizar en archivos parciales.
- Se usa `@use 'sass:math'`, `sass:map`, `sass:color` (módulos modernos de Sass). Bootstrap 5 aún usa `@import` internamente, por eso `angular.json` silencia ese aviso de deprecación.

## 14. Publicar las reglas de seguridad de Firestore

El archivo `firestore.rules` permite a un usuario autenticado **leer, crear, actualizar y eliminar solo tareas cuyo `userId` sea su UID**, impide crear tareas a nombre de otra persona, impide cambiar el dueño o la fecha de creación y valida los campos. **No hay ninguna regla abierta (`if true`).**

Opción A — Firebase Console (la más simple): **Firestore Database → pestaña Reglas** → borra el contenido, pega `firestore.rules` → **Publicar**.

Opción B — Firebase CLI:

```bash
npx firebase-tools login
npx firebase-tools use --add          # elige tu proyecto
npx firebase-tools deploy --only firestore:rules
```

> La configuración del frontend **no reemplaza** las reglas: cualquiera puede abrir la consola del navegador y llamar a Firestore. Las reglas, publicadas en el servidor, son la barrera real. El filtro `where('userId', '==', uid)` de la app solo evita pedir datos que las reglas igualmente rechazarían.
> Las consultas no usan `orderBy` junto con `where`, así que **no se necesita índice compuesto**; la ordenación se hace en el cliente.

## 15. Qué verificar antes de entregar (con tu Firebase real)

- [ ] `environment.ts` tiene tus 6 valores reales y desaparece el aviso amarillo.
- [ ] Authentication → Email/Password está habilitado.
- [ ] Reglas de `firestore.rules` **publicadas** (si no, verás "No tienes permiso…").
- [ ] Registrar un usuario nuevo → aparece en Authentication → Users y entra a `/tasks`.
- [ ] Crear una tarea → aparece un documento en la colección `tasks` con `userId`, `title`, `description`, `completed`, `createdAt`, `updatedAt`.
- [ ] Editar, marcar completada y eliminar (con confirmación) se reflejan en Firestore.
- [ ] Cerrar sesión → vuelve a `/login`; escribir `/tasks` redirige a `/login`.
- [ ] Recargar `/tasks` con sesión iniciada NO te manda a `/login`.
- [ ] Con un **segundo usuario** no ves las tareas del primero.
- [ ] (Opcional) En Firebase Console → Firestore → Reglas → **Simulador de reglas**: lectura de un documento con otro `userId` debe ser denegada.
- [ ] `npm run build` termina sin errores.

### Qué se probó durante el desarrollo
- `ng build` sin errores ni advertencias (TypeScript estricto).
- Prueba en Chromium con **Auth simulado a nivel de red** (el SDK real de Firebase Auth hablando con respuestas falsas) y **Firestore simulado en memoria**: 36 comprobaciones de interfaz (guard, registro, login, errores de credenciales/correo repetido/sin red, crear, editar, completar, eliminar con confirmación, filtros, aislamiento por `userId`, recarga con sesión, logout, 404 y vista móvil).
- **No** se probó contra Firebase real ni contra el emulador (no disponible en el entorno), por lo tanto **no se verificaron las reglas de Firestore** ni el comportamiento real de Firestore.
