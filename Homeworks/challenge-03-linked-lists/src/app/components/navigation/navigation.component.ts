import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** Barra de navegación principal entre Inicio y las dos demostraciones. */
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {}
