// Lista circular - rotacion de medicos de guardia
export class NodoCircular<T> {
  siguiente: NodoCircular<T>;
  constructor(public dato: T) {
    this.siguiente = this;
  }
}

export class ListaCircular<T> {
  actual: NodoCircular<T> | null = null;
  private ultimo: NodoCircular<T> | null = null;

  agregar(dato: T): void {
    const nuevo = new NodoCircular(dato);

    if (this.ultimo === null) {
      this.actual = nuevo;
      this.ultimo = nuevo;
      return;
    }

    nuevo.siguiente = this.ultimo.siguiente;
    this.ultimo.siguiente = nuevo;
    this.ultimo = nuevo;
  }

  avanzar(): void {
    if (this.actual !== null) {
      this.actual = this.actual.siguiente;
    }
  }

  obtenerActual(): T | null {
    return this.actual ? this.actual.dato : null;
  }

  obtenerTodos(): T[] {
    const lista: T[] = [];
    if (this.actual === null) return lista;

    let nodo = this.actual;
    do {
      lista.push(nodo.dato);
      nodo = nodo.siguiente;
    } while (nodo !== this.actual);

    return lista;
  }
}
