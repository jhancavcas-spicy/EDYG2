import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuNode } from '../../models/menu-node';

@Component({
  selector: 'app-menu-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  // Nodo del árbol que dibuja este componente
  node = input.required<MenuNode>();

  // Indica si los submenús están desplegados
  open = signal(true);

  toggle(): void {
    this.open.update((value) => !value);
  }
}
