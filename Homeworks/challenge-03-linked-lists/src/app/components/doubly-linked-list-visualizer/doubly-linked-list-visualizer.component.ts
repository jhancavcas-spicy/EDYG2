import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Page } from '../../models/page.model';

/**
 * Dibuja la DoublyLinkedList como una cadena de tarjetas unidas por flechas
 * dobles (⇄), con `null` en ambos extremos, evidenciando prev y next.
 */
@Component({
  selector: 'app-doubly-linked-list-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doubly-linked-list-visualizer.component.html',
  styleUrl: './doubly-linked-list-visualizer.component.css'
})
export class DoublyLinkedListVisualizerComponent {
  @Input() pages: Page[] = [];
  @Input() currentIndex = -1;
}
