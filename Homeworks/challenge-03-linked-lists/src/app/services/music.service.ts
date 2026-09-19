import { Injectable } from '@angular/core';
import { LinkedList, ListNode } from '../data-structures/linked-list';
import { Song } from '../models/song.model';

/**
 * Administra la playlist utilizando una LinkedList real (no un array).
 * Mantiene una referencia al nodo "actual" para simular un reproductor.
 */
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly playlist = new LinkedList<Song>();
  private currentNode: ListNode<Song> | null = null;

  constructor() {
    const mockSongs: Song[] = [
      { id: 1, title: 'Blinding Lights', artist: 'The Weeknd' },
      { id: 2, title: 'Shape of You', artist: 'Ed Sheeran' },
      { id: 3, title: 'As It Was', artist: 'Harry Styles' },
      { id: 4, title: 'Levitating', artist: 'Dua Lipa' },
      { id: 5, title: 'Starboy', artist: 'The Weeknd' },
      { id: 6, title: 'Stay', artist: 'The Kid LAROI' },
      { id: 7, title: 'Believer', artist: 'Imagine Dragons' }
    ];

    mockSongs.forEach(song => this.playlist.append(song));
    this.currentNode = this.playlist.getHead();
  }

  /** Devuelve todas las canciones en orden, solo para pintar la interfaz. */
  getAllSongs(): Song[] {
    return this.playlist.getAll();
  }

  getCurrentSong(): Song | null {
    return this.currentNode?.data ?? null;
  }

  getCurrentIndex(): number {
    return this.currentNode ? this.playlist.indexOf(this.currentNode) : -1;
  }

  getTotal(): number {
    return this.playlist.size();
  }

  hasNext(): boolean {
    return !!this.currentNode?.next;
  }

  hasPrevious(): boolean {
    if (!this.currentNode) {
      return false;
    }
    return this.playlist.getPrevious(this.currentNode) !== null;
  }

  /** Avanza siguiendo la referencia `next` del nodo actual. */
  next(): void {
    if (this.currentNode?.next) {
      this.currentNode = this.currentNode.next;
    }
  }

  /** Retrocede recorriendo la lista desde el head hasta hallar el nodo anterior. */
  previous(): void {
    if (!this.currentNode) {
      return;
    }
    const previous = this.playlist.getPrevious(this.currentNode);
    if (previous) {
      this.currentNode = previous;
    }
  }
}
