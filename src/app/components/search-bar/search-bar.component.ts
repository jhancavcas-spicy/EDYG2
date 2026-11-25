import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MusicDataService } from '../../services/music-data.service';
import { Song } from '../../models/song.model';

/**
 * Buscador predictivo. Cada vez que el usuario escribe, consulta el Trie
 * (a través de MusicDataService.getSuggestions) para mostrar sugerencias
 * por prefijo, sin usar un filtro de arreglos.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() songSelected = new EventEmitter<Song>();

  query = '';
  suggestions: string[] = [];
  showNoResults = false;
  isOpen = false;

  constructor(private readonly musicData: MusicDataService) {}

  onInputChange(): void {
    const trimmed = this.query.trim();

    if (trimmed.length === 0) {
      this.suggestions = [];
      this.showNoResults = false;
      this.isOpen = false;
      return;
    }

    // Consulta real al Trie por prefijo.
    this.suggestions = this.musicData.getSuggestions(trimmed, 8);
    this.showNoResults = this.suggestions.length === 0;
    this.isOpen = true;
  }

  selectSuggestion(title: string): void {
    const song = this.musicData.findSongByTitle(title);
    this.query = title;
    this.isOpen = false;
    this.suggestions = [];

    if (song) {
      this.musicData.selectSong(song);
      this.songSelected.emit(song);
    }
  }

  onFocus(): void {
    if (this.query.trim().length > 0) {
      this.isOpen = true;
    }
  }

  onBlur(): void {
    // Pequeño retraso para permitir que el click en una sugerencia se registre
    // antes de cerrar la lista desplegable.
    setTimeout(() => (this.isOpen = false), 150);
  }

  clear(): void {
    this.query = '';
    this.suggestions = [];
    this.showNoResults = false;
    this.isOpen = false;
  }
}
