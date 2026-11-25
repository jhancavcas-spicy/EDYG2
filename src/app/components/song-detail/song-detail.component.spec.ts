import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SongDetailComponent } from './song-detail.component';
import { Song } from '../../models/song.model';

const SONG: Song = {
  id: 's1',
  title: 'Thriller',
  artist: 'Michael Jackson',
  plays: 820,
  album: 'Thriller',
  genre: 'Pop',
  duration: '5:57',
};

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra un estado vacío cuando no hay canción seleccionada', () => {
    expect(fixture.debugElement.query(By.css('.panel__empty'))).toBeTruthy();
  });

  it('muestra los detalles de la canción cuando se asigna una', () => {
    component.song = SONG;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.song-detail__title')).nativeElement.textContent;
    expect(title).toContain('Thriller');
    expect(fixture.debugElement.query(By.css('.panel__empty'))).toBeFalsy();
  });
});
