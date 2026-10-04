// Nodo de un árbol binario: un valor y dos referencias (hijo izquierdo y derecho)
export class Node {
  value: number;
  left: Node | null = null;
  right: Node | null = null;

  constructor(value: number) {
    this.value = value;
  }

  // Un nodo hoja es el que no tiene hijos
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }
}
