import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { menuTree } from './data/menu-tree';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Árbol N-ario con los menús y submenús
  menuTree = menuTree;
}
