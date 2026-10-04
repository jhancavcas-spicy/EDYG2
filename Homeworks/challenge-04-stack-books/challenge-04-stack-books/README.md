# Challenge 04 — Stack de Libros

## Objetivo

Implementar y demostrar visualmente una **Stack (Pila)** aplicada a una colección de libros, usando el principio **LIFO** (Last In, First Out): el último libro agregado es el primero en salir.

## Concepto utilizado: Stack / LIFO

La estructura está implementada desde cero en `src/structures/Stack.js`, usando un array **interno** (no expuesto) como almacenamiento. Los componentes de React nunca llaman a `array.push()`/`array.pop()` directamente — siempre usan los métodos de la clase `Stack`.

### Métodos implementados

- `push(item)` — agrega un elemento al TOP de la pila.
- `pop()` — elimina y devuelve el elemento del TOP.
- `peek()` — devuelve el elemento del TOP sin eliminarlo.
- `isEmpty()` — indica si la pila está vacía.
- `size()` — cantidad de elementos actuales.
- `print()` — devuelve los elementos ordenados del TOP hacia el BOTTOM, listos para mostrarse en pantalla.

## Estructura del proyecto

```
src/
├── components/
│   ├── BookForm.jsx   → formulario controlado para crear un libro
│   └── BookList.jsx   → visualización de la pila (TOP → BOTTOM)
├── models/
│   └── Book.js        → fábrica de libros + libros mock iniciales
├── structures/
│   └── Stack.js        → implementación de la Stack (LIFO)
├── pages/
│   └── BooksStack.jsx  → pantalla principal, conecta todo
├── App.jsx
├── main.jsx
└── styles.css
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Abre la URL que indique la terminal (por defecto `http://localhost:5173/`).

## Qué debe demostrarse en pantalla

- La pila arranca con 4 libros mock ya cargados.
- El formulario permite crear un libro (Nombre, ISBN, Autor, Editorial) y agregarlo con `push()` — queda visualmente en el TOP.
- La sección de información muestra en vivo: tamaño (`size()`), si está vacía (`isEmpty()`) y cuál es el libro del TOP (`peek()`).
- El botón **Peek** muestra cuál es el libro del TOP sin eliminarlo (solo actualiza el mensaje de la última acción).
- El botón **Pop** elimina el libro del TOP (`pop()`) y la lista se actualiza al instante.
- La lista completa se muestra de TOP a BOTTOM usando `print()`, con el TOP resaltado — así se demuestra visualmente el comportamiento LIFO: agregar y quitar siempre ocurre en el mismo extremo.

## Cómo demostrar LIFO en la sustentación

1. Agrega un libro nuevo con el formulario → señala que apareció arriba de todo (TOP).
2. Agrega un segundo libro → señala que este nuevo pasó a ser el TOP, empujando al anterior hacia abajo.
3. Presiona **Pop** → el libro que sale es justamente el último que agregaste (el segundo), no el primero — esa es la esencia de LIFO.
4. Presiona **Peek** un par de veces → muestra que el TOP no cambia ni se elimina nada, a diferencia de Pop.
