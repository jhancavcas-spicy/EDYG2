/**
 * Implementación propia de una Queue (Cola).
 * Principio FIFO: First In, First Out — la primera persona que
 * entra a la cola es la primera en salir.
 *
 * Internamente usa un array como almacenamiento, pero la
 * aplicación NUNCA debe llamar directamente a métodos de array
 * (push/shift) sobre esa colección; siempre debe pasar por los
 * métodos de esta clase.
 *
 * El primer elemento del array interno representa el FRENTE
 * (frente de la fila) y el último representa el final de la cola.
 */
export class Queue {
  constructor(initialItems = []) {
    this.items = [...initialItems];
  }

  /** Agrega un elemento al final de la cola. */
  enqueue(item) {
    this.items.push(item);
  }

  /** Elimina y devuelve el elemento del frente. undefined si está vacía. */
  dequeue() {
    return this.items.shift();
  }

  /** Devuelve el elemento del frente sin eliminarlo. */
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[0];
  }

  /** true si la cola no tiene elementos. */
  isEmpty() {
    return this.items.length === 0;
  }

  /** Cantidad de elementos actualmente en la cola. */
  size() {
    return this.items.length;
  }

  /**
   * Devuelve una copia de los elementos en orden de la cola
   * (frente primero), listos para mostrarse en pantalla.
   */
  print() {
    return [...this.items];
  }
}
