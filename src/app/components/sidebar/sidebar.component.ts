import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * Barra lateral de navegación. En esta versión educativa las secciones
 * son solo visuales (el dashboard completo vive en una sola pantalla),
 * pero se deja la estructura lista para crecer a rutas reales.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly navItems = [
    { icon: '🏠', label: 'Inicio', active: true },
    { icon: '🔎', label: 'Buscar', active: false },
    { icon: '🏆', label: 'Ranking', active: false },
    { icon: '🔗', label: 'Relacionadas', active: false },
  ];
}
