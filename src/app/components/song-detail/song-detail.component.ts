import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Song } from '../../models/song.model';

/**
 * Información de la canción actualmente seleccionada en el dashboard.
 */
@Component({
  selector: 'app-song-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss',
})
export class SongDetailComponent {
  @Input() song: Song | null = null;
}
