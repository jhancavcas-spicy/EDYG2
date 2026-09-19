import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Página de inicio: explica el proyecto y enlaza a las dos demostraciones. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
