import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Song } from '../../models/song.model';
import { SongCardComponent } from '../song-card/song-card.component';

/**
 * Panel de "Canciones relacionadas". Muestra los vecinos de la canción
 * seleccionada en el grafo no dirigido (calculados por
 * MusicDataService.getRecommendations).
 */
@Component({
  selector: 'app-recommendations-panel',
  standalone: true,
  imports: [CommonModule, SongCardComponent],
  templateUrl: './recommendations-panel.component.html',
  styleUrl: './recommendations-panel.component.scss',
})
export class RecommendationsPanelComponent {
  @Input() selectedSong: Song | null = null;
  @Input() recommendations: Song[] = [];

  @Output() select = new EventEmitter<Song>();

  onSelect(song: Song): void {
    this.select.emit(song);
  }
}
