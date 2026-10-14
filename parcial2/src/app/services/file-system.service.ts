import { Injectable, inject, signal } from '@angular/core';
import { NaryTree } from '../models/nary-tree';
import { NodeType, TreeNode } from '../models/tree-node';
import { AuthService } from './auth.service';
import { TreeDbService } from './tree-db.service';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private readonly auth = inject(AuthService);
  private readonly db = inject(TreeDbService);
  private tree: NaryTree;

  // equal: () => false -> el árbol se muta in-place, así forzamos la notificación.
  readonly root = signal<TreeNode>(null as unknown as TreeNode, { equal: () => false });

  constructor() {
    this.tree = NaryTree.fromRecords(this.db.getAll()) ?? this.createRoot();
    this.root.set(this.tree.root);
  }

  create(parentId: string, name: string, type: NodeType): string | null {
    const email = this.auth.email();
    if (!this.auth.isRegistered(email)) return 'Debes iniciar sesión con un usuario registrado.';
    const clean = name.trim();
    if (!clean) return 'El nombre es obligatorio.';

    try {
      const parent = this.tree.find(parentId);
      if (!parent) return 'La carpeta destino no existe.';
      if (!parent.isFolder) return 'Un archivo no puede tener hijos.';
      const node = new TreeNode(crypto.randomUUID(), clean, type, email!);
      this.tree.insert(parentId, node);
      this.commit();
      return null;
    } catch (e) {
      return (e as Error).message;
    }
  }

  remove(id: string): string | null {
    if (!this.auth.isRegistered(this.auth.email())) return 'Debes iniciar sesión.';
    try {
      this.tree.remove(id);
      this.commit();
      return null;
    } catch (e) {
      return (e as Error).message;
    }
  }

  /** Lista BFS/DFS para mostrar el recorrido en consola o en pantalla. */
  flatten(mode: 'dfs' | 'bfs'): string[] {
    const out: string[] = [];
    this.tree[mode]((n, d) => out.push('  '.repeat(d) + (n.isFolder ? '📁 ' : '📄 ') + n.name));
    return out;
  }

  private commit(): void {
    this.db.saveAll(this.tree.toRecords());
    this.root.set(this.tree.root);
  }

  private createRoot(): NaryTree {
    const root = new TreeNode('root', 'raiz', 'folder', 'sistema');
    const tree = new NaryTree(root);
    this.db.saveAll(tree.toRecords());
    return tree;
  }
}
