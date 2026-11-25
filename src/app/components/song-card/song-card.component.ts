import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Song } from '../../models/song.model';

/**
 * Tarjeta visual que representa una canción. Se reutiliza en el grid de
 * canciones populares y en el panel de recomendaciones.
 */
@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input({ required: true }) song!: Song;
  @Input() selected = false;
  @Input() showPlays = true;

  @Output() select = new EventEmitter<Song>();

  onSelect(): void {
    this.select.emit(this.song);
  }

  /** Iniciales del título, usadas como "portada" de prueba cuando no hay imagen. */
  get initials(): string {
    return this.song.title
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('');
  }
}
