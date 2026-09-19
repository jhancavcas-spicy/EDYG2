import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/song.model';
import { LinkedListVisualizerComponent } from '../../components/linked-list-visualizer/linked-list-visualizer.component';

/**
 * Página "Lista Enlazada": un reproductor de canciones que recorre
 * una LinkedList real usando las referencias de sus nodos.
 */
@Component({
  selector: 'app-linked-list-page',
  standalone: true,
  imports: [CommonModule, LinkedListVisualizerComponent],
  templateUrl: './linked-list-page.component.html',
  styleUrl: './linked-list-page.component.css'
})
export class LinkedListPageComponent {
  songs: Song[];

  constructor(private musicService: MusicService) {
    this.songs = this.musicService.getAllSongs();
  }

  get currentSong(): Song | null {
    return this.musicService.getCurrentSong();
  }

  get currentIndex(): number {
    return this.musicService.getCurrentIndex();
  }

  get total(): number {
    return this.musicService.getTotal();
  }

  get canGoNext(): boolean {
    return this.musicService.hasNext();
  }

  get canGoPrevious(): boolean {
    return this.musicService.hasPrevious();
  }

  next(): void {
    this.musicService.next();
  }

  previous(): void {
    this.musicService.previous();
  }
}
