import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Song } from '../../models/song.model';

/**
 * Lista visual del TOP de canciones más populares. Recibe ya calculado
 * el ranking (vía MusicDataService.getTopSongs, que usa el Max Heap) y
 * solo se encarga de representarlo.
 */
@Component({
  selector: 'app-ranking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss',
})
export class RankingListComponent {
  @Input({ required: true }) songs: Song[] = [];
  @Input() selectedSongId: string | null = null;

  @Output() select = new EventEmitter<Song>();

  onSelect(song: Song): void {
    this.select.emit(song);
  }
}
