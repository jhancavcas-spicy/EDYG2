import { Component } from '@angular/core';

/**
 * Muestra un indicador de carga mientras se simula
 * la obtención inicial de los contactos.
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {}
