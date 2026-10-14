import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Página 404, siguiendo el ejemplo visto en clase. */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
