// Lista doblemente enlazada - historial de atencion
export class NodoDoble<T> {
  siguiente: NodoDoble<T> | null = null;
  anterior: NodoDoble<T> | null = null;
  constructor(public dato: T) {}
}

export class ListaDoble<T> {
  cabeza: NodoDoble<T> | null = null;
  cola: NodoDoble<T> | null = null;

  agregar(dato: T): void {
    const nuevo = new NodoDoble(dato);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      nuevo.anterior = this.cola;
      this.cola!.siguiente = nuevo;
      this.cola = nuevo;
    }
  }

  obtenerTodos(): T[] {
    const lista: T[] = [];
    let actual = this.cabeza;

    while (actual !== null) {
      lista.push(actual.dato);
      actual = actual.siguiente;
    }
    return lista;
  }

  // recorrido hacia atras usando el puntero anterior
  obtenerInverso(): T[] {
    const lista: T[] = [];
    let actual = this.cola;

    while (actual !== null) {
      lista.push(actual.dato);
      actual = actual.anterior;
    }
    return lista;
  }
}
