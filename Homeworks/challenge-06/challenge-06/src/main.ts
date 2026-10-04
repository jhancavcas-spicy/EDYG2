import "./style.css";
import { BinaryTree } from "./BinaryTree";
import { drawTree } from "./drawTree";

const tree = new BinaryTree();

// 1. Insertar una serie de números (el último 40 está repetido a propósito)
const numbers = [50, 30, 70, 20, 40, 60, 80, 40];
for (const n of numbers) {
  if (!tree.insert(n)) {
    console.log(`El valor ${n} ya existe en el árbol, no se inserta.`);
  }
}

// 2. Imprimir los recorridos por consola
console.log("InOrder:  ", tree.inOrder().join(" - "));
console.log("PreOrder: ", tree.preOrder().join(" - "));
console.log("PostOrder:", tree.postOrder().join(" - "));

// 3. Comprobar si un valor está en el árbol
function checkValue(value: number): void {
  if (tree.search(value)) {
    console.log(`El valor ${value} se encuentra en el árbol.`);
  } else {
    console.log(`El valor ${value} no se encuentra en el árbol.`);
  }
}

checkValue(60); // existe
checkValue(65); // no existe

// 4. Mostrar el árbol con D3
drawTree(tree.root, "#tree");
