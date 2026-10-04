// Nodo de un árbol N-ario de menús: puede tener cualquier cantidad de hijos
export class MenuNode {
  title: string;
  link: string;
  component: string;
  children: MenuNode[] = [];

  constructor(title: string, link: string, component: string) {
    this.title = title;
    this.link = link;
    this.component = component;
  }

  // Agrega un hijo (submenú) a este nodo
  addChild(node: MenuNode): void {
    this.children.push(node);
  }
}
