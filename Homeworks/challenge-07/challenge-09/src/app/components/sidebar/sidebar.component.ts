import { Component, input } from '@angular/core';
import { MenuNode } from '../../models/menu-node';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-sidebar',
  imports: [MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // Raíz del árbol N-ario; el sidebar dibuja sus hijos
  root = input.required<MenuNode>();
}
