/**
 * Nodo de una lista doblemente enlazada. Mantiene referencia tanto al
 * siguiente nodo (`next`) como al anterior (`prev`).
 */
export class DoublyNode<T> {
  data: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

/**
 * Lista doblemente enlazada implementada desde cero con nodos y
 * referencias `prev`/`next` (no utiliza un array como estructura interna).
 */
export class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private count = 0;

  /** Agrega un elemento al final de la lista. */
  append(data: T): DoublyNode<T> {
    const node = new DoublyNode<T>(data);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.count++;
    return node;
  }

  /** Agrega un elemento al inicio de la lista. */
  prepend(data: T): DoublyNode<T> {
    const node = new DoublyNode<T>(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    this.count++;
    return node;
  }

  /** Elimina el nodo ubicado en `index`, actualizando prev/next de sus vecinos. */
  remove(index: number): boolean {
    const target = this.getNodeAt(index);
    if (!target) {
      return false;
    }

    if (target.prev) {
      target.prev.next = target.next;
    } else {
      this.head = target.next;
    }

    if (target.next) {
      target.next.prev = target.prev;
    } else {
      this.tail = target.prev;
    }

    target.next = null;
    target.prev = null;
    this.count--;
    return true;
  }

  /** Busca el primer nodo (recorriendo desde head) cuyo dato cumpla `predicate`. */
  find(predicate: (data: T) => boolean): DoublyNode<T> | null {
    let current = this.head;
    while (current) {
      if (predicate(current.data)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /** Retorna el dato ubicado en `index`. */
  get(index: number): T | undefined {
    return this.getNodeAt(index)?.data;
  }

  /** Retorna el nodo ubicado en `index`, recorriendo desde head. */
  getNodeAt(index: number): DoublyNode<T> | null {
    if (index < 0 || index >= this.count) {
      return null;
    }

    let current = this.head;
    let i = 0;
    while (current && i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }

  getHead(): DoublyNode<T> | null {
    return this.head;
  }

  getTail(): DoublyNode<T> | null {
    return this.tail;
  }

  /** Recorrido hacia adelante: desde head hasta tail, usando `next`. */
  getAll(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  /** Recorrido hacia atrás: desde tail hasta head, usando `prev`. */
  getAllReversed(): T[] {
    const result: T[] = [];
    let current = this.tail;
    while (current) {
      result.push(current.data);
      current = current.prev;
    }
    return result;
  }

  /**
   * Elimina todos los nodos posteriores a `node` y lo convierte en el
   * nuevo tail. Se usa para simular que, al visitar una página nueva desde
   * un punto intermedio del historial, se pierde el historial "hacia
   * adelante" — igual que en un navegador real.
   */
  truncateAfter(node: DoublyNode<T>): void {
    let current = node.next;
    let removed = 0;
    while (current) {
      removed++;
      current = current.next;
    }

    node.next = null;
    this.tail = node;
    this.count -= removed;
  }
}
