// Lista simplemente enlazada - pacientes en espera
export class NodoSimple<T> {
  siguiente: NodoSimple<T> | null = null;
  constructor(public dato: T) {}
}

export class ListaSimple<T> {
  cabeza: NodoSimple<T> | null = null;

  agregar(dato: T): void {
    const nuevo = new NodoSimple(dato);

    if (this.cabeza === null) {
      this.cabeza = nuevo;
      return;
    }

    let actual = this.cabeza;
    while (actual.siguiente !== null) {
      actual = actual.siguiente;
    }
    actual.siguiente = nuevo;
  }

  eliminarPrimero(): T | null {
    if (this.cabeza === null) return null;

    const dato = this.cabeza.dato;
    this.cabeza = this.cabeza.siguiente;
    return dato;
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
}
