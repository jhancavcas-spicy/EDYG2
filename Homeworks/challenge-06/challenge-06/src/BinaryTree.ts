import { Node } from "./Node";

// Árbol binario de búsqueda: menores a la izquierda, mayores a la derecha
export class BinaryTree {
  root: Node | null = null;

  // Inserta un valor. Devuelve false si el valor ya existe (no se permiten repetidos)
  insert(value: number): boolean {
    const newNode = new Node(value);

    // Árbol vacío: el nuevo nodo es la raíz
    if (this.root === null) {
      this.root = newNode;
      return true;
    }

    // Se baja por el árbol hasta encontrar el lugar libre
    let current = this.root;
    while (true) {
      if (value === current.value) {
        return false; // repetido
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return true;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return true;
        }
        current = current.right;
      }
    }
  }

  // Busca un valor aprovechando el orden del árbol: en cada nodo se descarta una mitad
  search(value: number): boolean {
    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        return true;
      }
      current = value < current.value ? current.left : current.right;
    }

    return false;
  }

  // InOrder: Izquierda -> Nodo -> Derecha (en un árbol de búsqueda sale ordenado)
  inOrder(): number[] {
    const result: number[] = [];
    this.inOrderFrom(this.root, result);
    return result;
  }

  // PreOrder: Nodo -> Izquierda -> Derecha
  preOrder(): number[] {
    const result: number[] = [];
    this.preOrderFrom(this.root, result);
    return result;
  }

  // PostOrder: Izquierda -> Derecha -> Nodo
  postOrder(): number[] {
    const result: number[] = [];
    this.postOrderFrom(this.root, result);
    return result;
  }

  // Métodos recursivos: visitan el nodo y guardan su valor en "result"
  private inOrderFrom(node: Node | null, result: number[]): void {
    if (node === null) return;
    this.inOrderFrom(node.left, result);
    result.push(node.value);
    this.inOrderFrom(node.right, result);
  }

  private preOrderFrom(node: Node | null, result: number[]): void {
    if (node === null) return;
    result.push(node.value);
    this.preOrderFrom(node.left, result);
    this.preOrderFrom(node.right, result);
  }

  private postOrderFrom(node: Node | null, result: number[]): void {
    if (node === null) return;
    this.postOrderFrom(node.left, result);
    this.postOrderFrom(node.right, result);
    result.push(node.value);
  }
}
