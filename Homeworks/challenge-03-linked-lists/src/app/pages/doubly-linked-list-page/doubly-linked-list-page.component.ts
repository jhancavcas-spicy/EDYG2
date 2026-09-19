import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserHistoryService } from '../../services/browser-history.service';
import { Page } from '../../models/page.model';
import { DoublyLinkedListVisualizerComponent } from '../../components/doubly-linked-list-visualizer/doubly-linked-list-visualizer.component';

/**
 * Página "Lista Doblemente Enlazada": simula el historial de un
 * navegador usando una DoublyLinkedList real.
 */
@Component({
  selector: 'app-doubly-linked-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DoublyLinkedListVisualizerComponent],
  templateUrl: './doubly-linked-list-page.component.html',
  styleUrl: './doubly-linked-list-page.component.css'
})
export class DoublyLinkedListPageComponent {
  newPageName = '';

  constructor(private historyService: BrowserHistoryService) {}

  get pages(): Page[] {
    return this.historyService.getAllPages();
  }

  get currentPage(): Page | null {
    return this.historyService.getCurrentPage();
  }

  get currentIndex(): number {
    return this.historyService.getCurrentIndex();
  }

  get total(): number {
    return this.historyService.getTotal();
  }

  get canGoBack(): boolean {
    return this.historyService.canGoBack();
  }

  get canGoForward(): boolean {
    return this.historyService.canGoForward();
  }

  goBack(): void {
    this.historyService.goBack();
  }

  goForward(): void {
    this.historyService.goForward();
  }

  visitPage(): void {
    if (!this.newPageName.trim()) {
      return;
    }
    this.historyService.visit(this.newPageName);
    this.newPageName = '';
  }
}
