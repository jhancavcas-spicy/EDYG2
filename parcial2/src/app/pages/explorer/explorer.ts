import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeType, TreeNode } from '../../models/tree-node';
import { AuthService } from '../../services/auth.service';
import { FileSystemService } from '../../services/file-system.service';
import { NodeItem } from '../../components/node-item/node-item';

@Component({
  selector: 'app-explorer',
  imports: [FormsModule, NodeItem],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss',
})
export class Explorer {
  readonly fs = inject(FileSystemService);
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  selected = signal<TreeNode | null>(null);
  name = '';
  type: NodeType = 'folder';
  message = signal('');
  isError = signal(false);

  select(node: TreeNode): void {
    this.selected.set(node);
  }

  create(): void {
    const target = this.selected() ?? this.fs.root();
    const err = this.fs.create(target.id, this.name, this.type);
    this.notify(err, 'Creado correctamente.');
    if (!err) this.name = '';
  }

  remove(node: TreeNode): void {
    const err = this.fs.remove(node.id);
    this.notify(err, 'Eliminado.');
    if (!err) this.selected.set(null);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private notify(err: string | null, ok: string): void {
    this.isError.set(!!err);
    this.message.set(err ?? ok);
  }
}
