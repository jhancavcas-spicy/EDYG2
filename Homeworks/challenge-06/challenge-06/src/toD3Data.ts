import type { Node } from "./Node";

// Formato que entiende d3.hierarchy: un objeto con una lista "children"
export interface TreeData {
  value: number | null; // null = hueco: representa un hijo que no existe
  side: "root" | "left" | "right"; // de qué lado cuelga del padre
  children?: TreeData[];
}

// Convierte nuestros Node (left/right) en objetos con "children"
export function toD3Data(node: Node, side: TreeData["side"] = "root"): TreeData {
  const data: TreeData = { value: node.value, side };

  // Una hoja no tiene children
  if (node.isLeaf()) {
    return data;
  }

  // children[0] es siempre el izquierdo y children[1] el derecho.
  // Si falta uno se pone un hueco, para que D3 no lo "centre" y se note de qué lado está el otro.
  data.children = [
    node.left ? toD3Data(node.left, "left") : { value: null, side: "left" },
    node.right ? toD3Data(node.right, "right") : { value: null, side: "right" },
  ];

  return data;
}
