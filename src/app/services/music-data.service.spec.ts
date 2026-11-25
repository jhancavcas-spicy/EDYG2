import { TestBed } from '@angular/core/testing';

import { MusicDataService } from './music-data.service';
import { MOCK_SONGS } from './mock-songs.data';

describe('MusicDataService', () => {
  let service: MusicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicDataService);
  });

  it('se crea y carga los datos de prueba en las tres estructuras', () => {
    expect(service).toBeTruthy();
    expect(service.getAllSongs().length).toBe(MOCK_SONGS.length);
  });

  describe('buscador predictivo (Trie)', () => {
    it('devuelve sugerencias reales para un prefijo existente', () => {
      const suggestions = service.getSuggestions('Bad');
      expect(suggestions).toContain('Bad Romance');
      expect(suggestions).toContain('Bad Guy');
    });

    it('confirma que un título exacto existe', () => {
      expect(service.songTitleExists('Thriller')).toBeTrue();
    });

    it('devuelve false para un título que no existe', () => {
      expect(service.songTitleExists('Cancion que no existe')).toBeFalse();
    });
  });

  describe('ranking de popularidad (Max Heap)', () => {
    it('devuelve el top 5 ordenado de mayor a menor número de reproducciones', () => {
      const top5 = service.getTopSongs(5);
      expect(top5.length).toBe(5);

      for (let i = 0; i < top5.length - 1; i++) {
        expect(top5[i].plays).toBeGreaterThanOrEqual(top5[i + 1].plays);
      }
    });
  });

  describe('recomendaciones (grafo no dirigido)', () => {
    it('devuelve canciones relacionadas para una canción con conexiones', () => {
      const recommendations = service.getRecommendations('s1'); // Blinding Lights
      expect(recommendations.length).toBeGreaterThan(0);
    });

    it('las relaciones son bidireccionales también a través del servicio', () => {
      const neighborsOfS1 = service.getRecommendations('s1').map((s) => s.id);
      expect(neighborsOfS1).toContain('s14');

      const neighborsOfS14 = service.getRecommendations('s14').map((s) => s.id);
      expect(neighborsOfS14).toContain('s1');
    });
  });

  describe('selección de canción activa', () => {
    it('emite la canción seleccionada a través de selectedSong$', (done) => {
      const song = service.getAllSongs()[0];

      service.selectedSong$.subscribe((selected) => {
        if (selected) {
          expect(selected.id).toBe(song.id);
          done();
        }
      });

      service.selectSong(song);
    });
  });
});
