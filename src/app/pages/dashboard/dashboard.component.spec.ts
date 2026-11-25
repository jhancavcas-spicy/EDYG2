import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { MusicDataService } from '../../services/music-data.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let musicData: MusicDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    musicData = TestBed.inject(MusicDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('carga el TOP 5 de canciones populares al iniciar (Max Heap)', () => {
    expect(component.topSongs.length).toBe(5);
  });

  it('renderiza una tarjeta de canción por cada elemento del TOP', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-song-card'));
    expect(cards.length).toBe(component.topSongs.length);
  });

  it('al seleccionar una canción, actualiza selectedSong y las recomendaciones del grafo', () => {
    const song = musicData.getAllSongs().find((s) => s.id === 's1')!;

    component.onSongSelected(song);
    fixture.detectChanges();

    expect(component.selectedSong?.id).toBe('s1');
    expect(component.recommendations.length).toBeGreaterThan(0);
  });
});
