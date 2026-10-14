import { Component, input, output, signal } from '@angular/core';
import { TreeNode } from '../../models/tree-node';

/** Componente recursivo: se invoca a sí mismo para pintar los hijos. */
@Component({
  selector: 'app-node-item',
  templateUrl: './node-item.html',
  styleUrl: './node-item.scss',
})
export class NodeItem {
  node = input.required<TreeNode>();
  selectedId = input<string | null>(null);
  select = output<TreeNode>();
  remove = output<TreeNode>();

  open = signal(true);

  toggle(): void {
    if (this.node().isFolder) this.open.update(v => !v);
  }
}
