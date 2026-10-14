export type NodeType = 'folder' | 'file';

/** Registro plano que se guarda en la "base de datos" (mock). */
export interface NodeRecord {
  id: string;
  parentId: string | null;
  name: string;
  type: NodeType;
  createdBy: string; // correo de quien lo creó (dato validador)
  createdAt: string;
}

/** Nodo de un árbol n-ario implementado desde cero. */
export class TreeNode {
  children: TreeNode[] = [];
  parent: TreeNode | null = null;

  constructor(
    public readonly id: string,
    public name: string,
    public readonly type: NodeType,
    public readonly createdBy: string,
    public readonly createdAt: string = new Date().toISOString(),
  ) {}

  get isFolder(): boolean {
    return this.type === 'folder';
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }

  /** Regla de negocio: un archivo NO puede tener hijos. */
  addChild(child: TreeNode): void {
    if (!this.isFolder) {
      throw new Error('Un archivo no puede tener hijos.');
    }
    if (this.children.some(c => c.name.toLowerCase() === child.name.toLowerCase())) {
      throw new Error(`Ya existe "${child.name}" en esta carpeta.`);
    }
    child.parent = this;
    this.children.push(child);
  }

  removeChild(id: string): boolean {
    const i = this.children.findIndex(c => c.id === id);
    if (i === -1) return false;
    this.children[i].parent = null;
    this.children.splice(i, 1);
    return true;
  }

  toRecord(): NodeRecord {
    return {
      id: this.id,
      parentId: this.parent?.id ?? null,
      name: this.name,
      type: this.type,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
    };
  }
}
