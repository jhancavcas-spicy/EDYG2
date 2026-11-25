import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RecommendationsPanelComponent } from './recommendations-panel.component';
import { Song } from '../../models/song.model';

const SELECTED: Song = { id: 's1', title: 'Blinding Lights', artist: 'The Weeknd', plays: 980 };
const RECS: Song[] = [{ id: 's14', title: 'Starboy', artist: 'The Weeknd', plays: 850 }];

describe('RecommendationsPanelComponent', () => {
  let component: RecommendationsPanelComponent;
  let fixture: ComponentFixture<RecommendationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra un mensaje vacío si no hay canción seleccionada', () => {
    component.selectedSong = null;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.panel__empty'))).toBeTruthy();
  });

  it('muestra un mensaje distinto si la canción seleccionada no tiene relaciones', () => {
    component.selectedSong = SELECTED;
    component.recommendations = [];
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.css('.panel__empty p')).nativeElement.textContent;
    expect(empty).toContain('no tiene relaciones');
  });

  it('muestra una tarjeta por cada canción relacionada', () => {
    component.selectedSong = SELECTED;
    component.recommendations = RECS;
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-song-card'));
    expect(cards.length).toBe(1);
  });
});
