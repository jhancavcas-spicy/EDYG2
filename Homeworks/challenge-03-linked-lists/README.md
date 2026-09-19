# Challenge 03 — Listas Enlazadas en Angular

## Objetivo del Challenge 03

Implementar dos estructuras de datos enlazadas **desde cero** (con nodos y referencias, sin usar arrays como estructura interna) y utilizarlas dentro de una aplicación Angular con dos páginas interactivas:

1. Una **lista enlazada simple** para reproducir canciones en orden.
2. Una **lista doblemente enlazada** para navegar hacia atrás y hacia adelante entre páginas visitadas, simulando el historial de un navegador.

## ¿Qué es una LinkedList (lista enlazada simple)?

Una estructura donde cada elemento (nodo) guarda su dato y una referencia al **siguiente** nodo (`next`). Para llegar a un nodo hay que recorrer la lista desde el `head`. Avanzar es directo; retroceder requiere recorrer la lista completa, porque un nodo no sabe quién es su anterior.

Implementación: `src/app/data-structures/linked-list.ts` (clases `ListNode<T>` y `LinkedList<T>`).

## ¿Qué es una DoublyLinkedList (lista doblemente enlazada)?

Una estructura similar, pero cada nodo también guarda una referencia a su nodo **anterior** (`prev`), además de `next`. Esto permite recorrer la lista en ambas direcciones sin tener que empezar desde el `head` cada vez.

Implementación: `src/app/data-structures/doubly-linked-list.ts` (clases `DoublyNode<T>` y `DoublyLinkedList<T>`).

## Estructura del proyecto

```
src/app/
├── data-structures/
│   ├── linked-list.ts           → ListNode<T> y LinkedList<T>
│   └── doubly-linked-list.ts    → DoublyNode<T> y DoublyLinkedList<T>
├── models/
│   ├── song.model.ts            → interfaz Song
│   └── page.model.ts            → interfaz Page
├── services/
│   ├── music.service.ts             → usa LinkedList<Song>
│   └── browser-history.service.ts   → usa DoublyLinkedList<Page>
├── components/
│   ├── navigation/                       → barra de navegación (Router)
│   ├── linked-list-visualizer/           → dibuja la LinkedList como cadena de nodos
│   └── doubly-linked-list-visualizer/    → dibuja la DoublyLinkedList con prev/next
├── pages/
│   ├── home/                     → landing con explicación y enlaces
│   ├── linked-list-page/         → reproductor de canciones
│   └── doubly-linked-list-page/  → historial del navegador
├── app.routes.ts                 → rutas: /, /linked-list, /doubly-linked-list
├── app.config.ts                 → configuración de la app (provideRouter)
└── app.component.ts              → raíz: navegación + router-outlet
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
ng serve
```

Abre en el navegador:

```
http://localhost:4200/
```

## Las dos páginas

### `/linked-list` — Reproductor de canciones

- Usa `MusicService`, que mantiene una `LinkedList<Song>` con 7 canciones de ejemplo y una referencia al nodo "actual".
- **Siguiente**: avanza con `currentNode.next`.
- **Anterior**: como la lista es simple, se recorre desde el `head` (método `getPrevious()`) hasta hallar el nodo cuyo `next` sea el nodo actual.
- Los botones se deshabilitan automáticamente en el primer y último nodo.
- Se visualiza la lista completa como `[Canción] → [Canción] → ... → null`, resaltando el nodo actual.

### `/doubly-linked-list` — Historial del navegador

- Usa `BrowserHistoryService`, que mantiene una `DoublyLinkedList<Page>` con 6 páginas de ejemplo, iniciando en "GitHub" (con historial hacia atrás y hacia adelante disponible).
- **Atrás**: usa `currentNode.prev`.
- **Adelante**: usa `currentNode.next`.
- **Visitar página**: agrega una nueva página al historial. Si el usuario estaba en un punto intermedio, todo el historial "hacia adelante" se elimina (`truncateAfter`) antes de agregar la nueva página, igual que en un navegador real.
- Se visualiza la lista completa como `null ← [Página] ⇄ [Página] ⇄ ... → null`, resaltando la página actual.

## Tecnologías utilizadas

- Angular 17 (componentes standalone)
- Angular Router
- TypeScript (clases e interfaces propias para las estructuras de datos)
- Angular Forms (`ngModel` para el formulario de "Visitar página")
- HTML5 / CSS3

## Notas sobre la implementación

- `LinkedList` y `DoublyLinkedList` están implementadas con clases de nodos (`ListNode<T>` / `DoublyNode<T>`) y referencias reales (`next` / `prev`); en ningún punto se usa un array como estructura interna. Los métodos `getAll()` solo se usan para *mostrar* los datos en la interfaz, recorriendo los nodos.
- Ambas estructuras exponen `append`, `prepend`, `remove`, `find`, `get`, `isEmpty`, `size` y `getAll`, además de utilidades propias del challenge (`getPrevious`, `truncateAfter`, etc.).
