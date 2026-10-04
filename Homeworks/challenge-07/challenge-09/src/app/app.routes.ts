import { Routes } from '@angular/router';
import { MenuNode } from './models/menu-node';
import { menuTree } from './data/menu-tree';
import { PageComponent } from './components/page/page.component';

// Recorre el árbol (DFS) y crea una ruta por cada nodo usando su link
function addRoutes(node: MenuNode, routes: Routes): void {
  for (const child of node.children) {
    routes.push({
      path: child.link.substring(1), // '/usuarios/lista' -> 'usuarios/lista'
      component: PageComponent,
      data: { node: child },
    });
    addRoutes(child, routes);
  }
}

export const routes: Routes = [{ path: '', redirectTo: 'inicio', pathMatch: 'full' }];
addRoutes(menuTree, routes);
