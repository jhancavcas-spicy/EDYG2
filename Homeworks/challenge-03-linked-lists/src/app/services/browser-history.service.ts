import { Injectable } from '@angular/core';
import { DoublyLinkedList, DoublyNode } from '../data-structures/doubly-linked-list';
import { Page } from '../models/page.model';

/**
 * Simula el historial de navegación del navegador utilizando una
 * DoublyLinkedList real, con referencias `prev` y `next`.
 */
@Injectable({
  providedIn: 'root'
})
export class BrowserHistoryService {
  private readonly history = new DoublyLinkedList<Page>();
  private currentNode: DoublyNode<Page> | null = null;
  private nextId = 1;

  constructor() {
    const mockPages = ['Google', 'YouTube', 'GitHub', 'Stack Overflow', 'Angular', 'MDN Web Docs'];
    mockPages.forEach(name => this.history.append(this.createPage(name)));

    // Simulamos que el usuario está actualmente en "GitHub": tiene historial
    // hacia atrás (Google, YouTube) y hacia adelante (Stack Overflow, Angular, MDN).
    this.currentNode = this.history.getNodeAt(2);
  }

  private createPage(name: string): Page {
    return { id: this.nextId++, name };
  }

  /** Devuelve todas las páginas en orden, solo para pintar la interfaz. */
  getAllPages(): Page[] {
    return this.history.getAll();
  }

  getCurrentPage(): Page | null {
    return this.currentNode?.data ?? null;
  }

  getCurrentIndex(): number {
    if (!this.currentNode) {
      return -1;
    }
    const currentId = this.currentNode.data.id;
    return this.history.getAll().findIndex(page => page.id === currentId);
  }

  getTotal(): number {
    return this.history.size();
  }

  canGoBack(): boolean {
    return !!this.currentNode?.prev;
  }

  canGoForward(): boolean {
    return !!this.currentNode?.next;
  }

  /** Navega hacia atrás usando current.prev. */
  goBack(): void {
    if (this.currentNode?.prev) {
      this.currentNode = this.currentNode.prev;
    }
  }

  /** Navega hacia adelante usando current.next. */
  goForward(): void {
    if (this.currentNode?.next) {
      this.currentNode = this.currentNode.next;
    }
  }

  /**
   * Simula visitar una página nueva: si había páginas "hacia adelante"
   * desde el nodo actual, se eliminan (como en un navegador real),
   * y la nueva página se agrega como el nuevo nodo actual.
   */
  visit(pageName: string): void {
    const trimmed = pageName.trim();
    if (!trimmed) {
      return;
    }

    const newPage = this.createPage(trimmed);

    if (this.currentNode) {
      this.history.truncateAfter(this.currentNode);
    }

    this.currentNode = this.history.append(newPage);
  }
}
