import { NodeRecord, TreeNode } from './tree-node';

/** Árbol n-ario: raíz + operaciones de recorrido, búsqueda e inserción. */
export class NaryTree {
  constructor(public root: TreeNode) {}

  /** DFS (preorden): baja por una rama hasta el fondo antes de seguir. */
  dfs(visit: (n: TreeNode, depth: number) => void, node: TreeNode = this.root, depth = 0): void {
    visit(node, depth);
    for (const child of node.children) this.dfs(visit, child, depth + 1);
  }

  /** BFS: recorre nivel por nivel usando una cola. */
  bfs(visit: (n: TreeNode, depth: number) => void): void {
    const queue: { node: TreeNode; depth: number }[] = [{ node: this.root, depth: 0 }];
    while (queue.length) {
      const { node, depth } = queue.shift()!;
      visit(node, depth);
      node.children.forEach(c => queue.push({ node: c, depth: depth + 1 }));
    }
  }

  find(id: string): TreeNode | null {
    let found: TreeNode | null = null;
    this.bfs(n => {
      if (!found && n.id === id) found = n;
    });
    return found;
  }

  insert(parentId: string, child: TreeNode): void {
    const parent = this.find(parentId);
    if (!parent) throw new Error('La carpeta destino no existe.');
    parent.addChild(child);
  }

  remove(id: string): void {
    if (id === this.root.id) throw new Error('No se puede eliminar la raíz.');
    const node = this.find(id);
    if (!node?.parent) throw new Error('El elemento no existe.');
    node.parent.removeChild(id);
  }

  /** Aplana el árbol a registros (preorden: el padre siempre va antes que sus hijos). */
  toRecords(): NodeRecord[] {
    const out: NodeRecord[] = [];
    this.dfs(n => out.push(n.toRecord()));
    return out;
  }

  /** Reconstruye el árbol desde los registros guardados. */
  static fromRecords(records: NodeRecord[]): NaryTree | null {
    const rootRec = records.find(r => r.parentId === null);
    if (!rootRec) return null;
    const make = (r: NodeRecord) => new TreeNode(r.id, r.name, r.type, r.createdBy, r.createdAt);
    const tree = new NaryTree(make(rootRec));
    const pending = records.filter(r => r !== rootRec);
    // Los registros vienen en preorden, así que el padre ya existe al insertar.
    for (const r of pending) tree.insert(r.parentId!, make(r));
    return tree;
  }
}
