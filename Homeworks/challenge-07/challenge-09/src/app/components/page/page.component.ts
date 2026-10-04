import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuNode } from '../../models/menu-node';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  // El nodo del menú llega en los datos de la ruta (ver app.routes.ts)
  node: MenuNode = inject(ActivatedRoute).snapshot.data['node'];
}
