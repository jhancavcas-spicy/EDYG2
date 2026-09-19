# Challenge 02 — Gestor de Contactos (Angular)

Aplicación Angular que permite listar, agregar y eliminar contactos, simulando una carga inicial de datos. Proyecto 100% local, sin backend.

## ¿Qué hace el proyecto?

- Muestra un loader (~1.8s) simulando la carga inicial de contactos.
- Lista los contactos cargados en tarjetas individuales.
- Permite agregar un contacto nuevo mediante un formulario con validaciones (nombre y teléfono obligatorios).
- Permite eliminar cualquier contacto de la lista.
- Todo ocurre sin recargar la página y sin peticiones a un servidor real (los datos viven en memoria dentro de `ContactService`).

## Tecnologías utilizadas

- Angular 17 (componentes standalone)
- TypeScript
- Angular Forms (Reactive Forms)
- HTML5 / CSS3
- RxJS (para simular la carga asíncrona)

## Instalación

```bash
npm install
```

## Ejecución

```bash
ng serve
```

Luego abre en el navegador:

```
http://localhost:4200/
```

## Estructura de componentes

```
src/app/
├── components/
│   ├── loader/          → Indicador de carga inicial
│   ├── contact-form/    → Formulario para agregar contactos (con validaciones)
│   ├── contact-list/    → Lista/grid de contactos
│   └── contact-item/    → Tarjeta individual de un contacto (con botón de eliminar)
├── services/
│   └── contact.service.ts → Maneja los contactos en memoria (carga, agregar, eliminar)
├── models/
│   └── contact.model.ts   → Interfaz Contact (id, name, phone)
├── app.component.ts       → Componente raíz, orquesta loader + formulario + lista
```

### Descripción breve de los componentes principales

- **LoaderComponent**: muestra un spinner mientras se "carga" la lista inicial.
- **ContactFormComponent**: captura nombre y teléfono, valida los campos y emite el nuevo contacto al componente padre (`AppComponent`).
- **ContactListComponent**: recibe el arreglo de contactos y los renderiza usando `ContactItemComponent`, propagando el evento de eliminación.
- **ContactItemComponent**: muestra un contacto individual y emite su `id` al presionar "Eliminar".
- **ContactService**: fuente única de datos en memoria; expone `getContacts()` (simulada con `delay`), `addContact()` y `deleteContact()`.

## Git

El proyecto incluye un `.gitignore` apropiado para Angular/Node. No contiene ningún repositorio remoto configurado; puedes inicializar Git y conectarlo a tu propio repositorio:

```bash
git init
git add .
git commit -m "Challenge 02: Gestor de Contactos"
git remote add origin <tu-repositorio>
git checkout -b <tu-rama>
git push -u origin <tu-rama>
```
