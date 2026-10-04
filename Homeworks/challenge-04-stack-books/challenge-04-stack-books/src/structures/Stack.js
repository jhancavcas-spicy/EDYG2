/**
 * Implementación propia de una Stack (Pila).
 * Principio LIFO: Last In, First Out — el último elemento
 * agregado es el primero en salir.
 *
 * Internamente usa un array como almacenamiento, pero la
 * aplicación NUNCA debe llamar directamente a métodos de array
 * (push/pop) sobre esa colección; siempre debe pasar por los
 * métodos de esta clase.
 *
 * El último elemento del array interno representa el TOP de la pila.
 */
export class Stack {
  constructor(initialItems = []) {
    this.items = [...initialItems];
  }

  /** Agrega un elemento al TOP de la pila. */
  push(item) {
    this.items.push(item);
  }

  /** Elimina y devuelve el elemento del TOP. undefined si está vacía. */
  pop() {
    return this.items.pop();
  }

  /** Devuelve el elemento del TOP sin eliminarlo. */
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  /** true si la pila no tiene elementos. */
  isEmpty() {
    return this.items.length === 0;
  }

  /** Cantidad de elementos actualmente en la pila. */
  size() {
    return this.items.length;
  }

  /**
   * Devuelve una copia de los elementos ordenados del TOP hacia el
   * BOTTOM (para mostrarlos en pantalla tal como se ve una pila real).
   */
  print() {
    return [...this.items].reverse();
  }
}
