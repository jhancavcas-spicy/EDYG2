// Lista circular doblemente enlazada - comite administrativo
export class NodoCircularDoble<T> {
  siguiente: NodoCircularDoble<T>;
  anterior: NodoCircularDoble<T>;
  constructor(public dato: T) {
    this.siguiente = this;
    this.anterior = this;
  }
}

export class ListaCircularDoble<T> {
  actual: NodoCircularDoble<T> | null = null;
  private ultimo: NodoCircularDoble<T> | null = null;

  agregar(dato: T): void {
    const nuevo = new NodoCircularDoble(dato);

    if (this.ultimo === null) {
      this.actual = nuevo;
      this.ultimo = nuevo;
      return;
    }

    const primero = this.ultimo.siguiente;

    nuevo.anterior = this.ultimo;
    nuevo.siguiente = primero;
    this.ultimo.siguiente = nuevo;
    primero.anterior = nuevo;
    this.ultimo = nuevo;
  }

  avanzar(): void {
    if (this.actual !== null) {
      this.actual = this.actual.siguiente;
    }
  }

  retroceder(): void {
    if (this.actual !== null) {
      this.actual = this.actual.anterior;
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
