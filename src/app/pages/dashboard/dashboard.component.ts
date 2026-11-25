import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MusicDataService } from '../../services/music-data.service';
import { Song } from '../../models/song.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { RecommendationsPanelComponent } from '../../components/recommendations-panel/recommendations-panel.component';
import { SongDetailComponent } from '../../components/song-detail/song-detail.component';

/**
 * Pantalla principal del dashboard. Conecta MusicDataService (que a su
 * vez envuelve Trie, Max Heap y Graph) con los componentes visuales:
 * buscador, ranking, recomendaciones e información de la canción
 * seleccionada.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    SearchBarComponent,
    SongCardComponent,
    RankingListComponent,
    RecommendationsPanelComponent,
    SongDetailComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  topSongs: Song[] = [];
  selectedSong: Song | null = null;
  recommendations: Song[] = [];

  readonly topCount = 5;

  constructor(private readonly musicData: MusicDataService) {}

  ngOnInit(): void {
    this.topSongs = this.musicData.getTopSongs(this.topCount);

    this.musicData.selectedSong$.subscribe((song) => {
      this.selectedSong = song;
      this.recommendations = song ? this.musicData.getRecommendations(song.id) : [];
    });
  }

  onSongSelected(song: Song): void {
    this.musicData.selectSong(song);
  }
}
