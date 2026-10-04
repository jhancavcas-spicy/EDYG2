# Challenge 05 — Queue de Personas en un Cajero

## Objetivo

Implementar y demostrar visualmente una **Queue (Cola)** aplicada a personas esperando turno en un cajero automático, usando el principio **FIFO** (First In, First Out): la primera persona en llegar es la primera en ser atendida.

## Concepto utilizado: Queue / FIFO

La estructura está implementada desde cero en `src/structures/Queue.js`, usando un array **interno** (no expuesto) como almacenamiento. Los componentes de React nunca llaman a `array.push()`/`array.shift()` directamente — siempre usan los métodos de la clase `Queue`.

### Métodos implementados

- `enqueue(item)` — agrega una persona al final de la cola.
- `dequeue()` — elimina y devuelve la primera persona (el frente).
- `peek()` — devuelve la primera persona sin eliminarla.
- `isEmpty()` — indica si la cola está vacía.
- `size()` — cantidad de personas actuales.
- `print()` — devuelve las personas en orden de llegada (frente primero), listas para mostrarse en pantalla.

## Estructura del proyecto

```
src/
├── components/
│   ├── PersonForm.jsx  → formulario controlado (nombre + monto)
│   └── QueueList.jsx   → visualización de la cola (frente → final)
├── models/
│   └── Person.js       → fábrica de personas + datos mock iniciales
├── structures/
│   └── Queue.js         → implementación de la Queue (FIFO)
├── pages/
│   └── AtmQueue.jsx     → pantalla principal, conecta todo
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

- La cola arranca con 3 personas mock ya cargadas, con horas de llegada distintas y ya en orden cronológico.
- El formulario solo pide **Nombre** y **Monto de retiro**; la `arrivalDate` la asigna el sistema automáticamente al presionar "Agregar a la cola" (`enqueue()`).
- La sección de información muestra en vivo: tamaño (`size()`), si está vacía (`isEmpty()`), la primera persona y la última persona de la cola.
- El botón **Peek** muestra quién es la primera persona sin eliminarla.
- El botón **Dequeue** atiende y elimina a la primera persona (`dequeue()`), y la lista se actualiza al instante.
- La lista completa se muestra en orden de llegada (frente primero), con la persona del frente resaltada — así se demuestra visualmente el comportamiento FIFO.

## Cómo demostrar FIFO en la sustentación

1. Agrega dos personas nuevas con el formulario, una después de otra → señala que cada una se agregó al FINAL de la cola, no al frente.
2. Presiona **Dequeue** → la persona que sale es la que **primero llegó** (no la última agregada) — esa es la esencia de FIFO, al contrario de lo que haría una Stack.
3. Presiona **Peek** un par de veces → muestra que el frente no cambia ni se elimina nada, a diferencia de Dequeue.
4. Señala las horas de llegada mostradas en cada tarjeta: confirman que el orden de la cola siempre respeta el orden cronológico de llegada.
