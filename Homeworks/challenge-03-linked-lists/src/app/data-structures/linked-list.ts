/**
 * Nodo de una lista enlazada simple.
 * Se llama ListNode (en vez de Node) para no chocar con la interfaz
 * global `Node` del DOM que ya existe en TypeScript.
 */
export class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

/**
 * Lista enlazada simple implementada desde cero con nodos y referencias
 * (no utiliza un array como estructura interna).
 */
export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private count = 0;

  /** Agrega un elemento al final de la lista. */
  append(data: T): ListNode<T> {
    const node = new ListNode<T>(data);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.count++;
    return node;
  }

  /** Agrega un elemento al inicio de la lista. */
  prepend(data: T): ListNode<T> {
    const node = new ListNode<T>(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.count++;
    return node;
  }

  /** Elimina el nodo ubicado en `index`. Retorna true si lo logró. */
  remove(index: number): boolean {
    if (index < 0 || index >= this.count || !this.head) {
      return false;
    }

    if (index === 0) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.count--;
      return true;
    }

    const previous = this.getNodeAt(index - 1);
    const target = previous?.next ?? null;

    if (!previous || !target) {
      return false;
    }

    previous.next = target.next;
    if (target === this.tail) {
      this.tail = previous;
    }

    this.count--;
    return true;
  }

  /** Busca el primer nodo cuyo dato cumpla con `predicate`. */
  find(predicate: (data: T) => boolean): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (predicate(current.data)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /** Retorna el dato ubicado en `index`, recorriendo la lista desde head. */
  get(index: number): T | undefined {
    return this.getNodeAt(index)?.data;
  }

  /** Retorna el nodo ubicado en `index`, recorriendo la lista desde head. */
  getNodeAt(index: number): ListNode<T> | null {
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

  /**
   * Una lista enlazada simple no guarda una referencia al nodo anterior,
   * así que para "retroceder" hay que recorrer la lista completa desde
   * el head hasta encontrar el nodo cuyo `next` sea el nodo objetivo.
   */
  getPrevious(target: ListNode<T>): ListNode<T> | null {
    if (!this.head || this.head === target) {
      return null;
    }

    let current: ListNode<T> | null = this.head;
    while (current && current.next) {
      if (current.next === target) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /** Retorna la posición (0-based) de un nodo dentro de la lista, o -1. */
  indexOf(node: ListNode<T>): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current === node) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }

  getHead(): ListNode<T> | null {
    return this.head;
  }

  getTail(): ListNode<T> | null {
    return this.tail;
  }

  /** Recorre la lista desde head hasta null y devuelve los datos en orden. */
  getAll(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}
