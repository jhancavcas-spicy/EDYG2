import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Song } from '../models/song.model';
import { Trie } from '../structures/trie/trie';
import { MaxHeap } from '../structures/heap/max-heap';
import { Graph } from '../structures/graph/graph';
import { MOCK_SONGS, MOCK_RELATIONS } from './mock-songs.data';

/**
 * Servicio central de la plataforma: mantiene las tres estructuras de
 * datos (Trie, Max Heap, Graph) sincronizadas con el catálogo de
 * canciones y expone una API simple para los componentes visuales.
 *
 * Este servicio es deliberadamente el único lugar donde se instancian
 * las estructuras de datos, para mantener la lógica de estructuras
 * separada de los componentes visuales (requisito del enunciado).
 */
@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  private readonly trie = new Trie();
  private readonly heap = new MaxHeap();
  private readonly graph = new Graph();

  /** Catálogo completo de canciones, indexado por id para acceso O(1). */
  private readonly songsById = new Map<string, Song>();

  /** Canción actualmente seleccionada en el dashboard (para info + recomendaciones). */
  private readonly selectedSongSubject = new BehaviorSubject<Song | null>(null);
  readonly selectedSong$: Observable<Song | null> = this.selectedSongSubject.asObservable();

  constructor() {
    this.loadSeedData();
  }

  /** Carga los datos de demostración en las tres estructuras. */
  private loadSeedData(): void {
    for (const song of MOCK_SONGS) {
      this.addSong(song);
    }

    for (const relation of MOCK_RELATIONS) {
      for (const relatedId of relation.relatedIds) {
        this.graph.addEdge(relation.songId, relatedId);
      }
    }

    // Deja una traza en consola de la lista de adyacencia inicial,
    // útil para comprobar manualmente que el grafo es no dirigido.
    this.graph.printAdjacency();
  }

  // -----------------------------------------------------------------
  // Alta de canciones (mantiene las 3 estructuras sincronizadas)
  // -----------------------------------------------------------------

  /** Agrega una canción nueva al catálogo y a las tres estructuras de datos. */
  addSong(song: Song): void {
    this.songsById.set(song.id, song);
    this.trie.insert(song.title);
    this.heap.insert(song);
    this.graph.addNode(song);
  }

  // -----------------------------------------------------------------
  // Buscador predictivo (Trie)
  // -----------------------------------------------------------------

  /** Sugerencias de títulos que comienzan con `prefix`, usando el Trie. */
  getSuggestions(prefix: string, limit: number = 8): string[] {
    return this.trie.getSuggestions(prefix, limit);
  }

  /** Comprueba si existe una canción con ese título exacto. */
  songTitleExists(title: string): boolean {
    return this.trie.search(title);
  }

  /** Busca el objeto Song a partir de un título exacto devuelto por el Trie. */
  findSongByTitle(title: string): Song | undefined {
    for (const song of this.songsById.values()) {
      if (song.title === title) {
        return song;
      }
    }
    return undefined;
  }

  // -----------------------------------------------------------------
  // Ranking de popularidad (Max Heap)
  // -----------------------------------------------------------------

  /** Devuelve el TOP K de canciones más escuchadas usando el Max Heap. */
  getTopSongs(k: number = 5): Song[] {
    return this.heap.getTopSongs(k);
  }

  // -----------------------------------------------------------------
  // Recomendaciones (Grafo no dirigido)
  // -----------------------------------------------------------------

  /** Devuelve las canciones relacionadas con `songId` según el grafo. */
  getRecommendations(songId: string): Song[] {
    return this.graph.getNeighbors(songId);
  }

  // -----------------------------------------------------------------
  // Selección de canción activa (estado compartido entre componentes)
  // -----------------------------------------------------------------

  selectSong(song: Song): void {
    this.selectedSongSubject.next(song);
  }

  clearSelection(): void {
    this.selectedSongSubject.next(null);
  }

  getAllSongs(): Song[] {
    return [...this.songsById.values()];
  }

  getSongById(id: string): Song | undefined {
    return this.songsById.get(id);
  }
}
