import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Song } from '../../models/song.model';

/**
 * Dibuja la LinkedList como una cadena de tarjetas conectadas por flechas,
 * terminando en `null`, para que se vea claramente la estructura de nodos.
 */
@Component({
  selector: 'app-linked-list-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linked-list-visualizer.component.html',
  styleUrl: './linked-list-visualizer.component.css'
})
export class LinkedListVisualizerComponent {
  @Input() songs: Song[] = [];
  @Input() currentIndex = -1;
}
