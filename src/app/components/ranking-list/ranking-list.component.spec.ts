import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RankingListComponent } from './ranking-list.component';
import { Song } from '../../models/song.model';

const SONGS: Song[] = [
  { id: 's1', title: 'Song One', artist: 'Artist A', plays: 100 },
  { id: 's2', title: 'Song Two', artist: 'Artist B', plays: 80 },
];

describe('RankingListComponent', () => {
  let component: RankingListComponent;
  let fixture: ComponentFixture<RankingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RankingListComponent);
    component = fixture.componentInstance;
    component.songs = SONGS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra una tarjeta de ranking por cada canción recibida', () => {
    const cards = fixture.debugElement.queryAll(By.css('.rank-card'));
    expect(cards.length).toBe(2);
  });

  it('muestra el mensaje vacío cuando no hay canciones', () => {
    component.songs = [];
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.css('.panel__empty'));
    expect(empty).toBeTruthy();
  });

  it('emite select con la canción elegida', () => {
    spyOn(component.select, 'emit');

    const firstCard = fixture.debugElement.query(By.css('.rank-card'));
    firstCard.triggerEventHandler('click', null);

    expect(component.select.emit).toHaveBeenCalledWith(SONGS[0]);
  });
});
