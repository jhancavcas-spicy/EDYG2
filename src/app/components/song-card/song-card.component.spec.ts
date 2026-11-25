import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SongCardComponent } from './song-card.component';
import { Song } from '../../models/song.model';

const SAMPLE_SONG: Song = {
  id: 's1',
  title: 'Bad Romance',
  artist: 'Lady Gaga',
  plays: 500,
  genre: 'Pop',
};

describe('SongCardComponent', () => {
  let component: SongCardComponent;
  let fixture: ComponentFixture<SongCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongCardComponent);
    component = fixture.componentInstance;
    component.song = SAMPLE_SONG;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra el título y el artista de la canción', () => {
    const title = fixture.debugElement.query(By.css('.song-card__title')).nativeElement.textContent;
    const artist = fixture.debugElement.query(By.css('.song-card__artist')).nativeElement.textContent;

    expect(title).toContain('Bad Romance');
    expect(artist).toContain('Lady Gaga');
  });

  it('calcula las iniciales del título para la portada de prueba', () => {
    expect(component.initials).toBe('BR');
  });

  it('emite el evento select con la canción al hacer click', () => {
    spyOn(component.select, 'emit');

    const card = fixture.debugElement.query(By.css('.song-card'));
    card.triggerEventHandler('click', null);

    expect(component.select.emit).toHaveBeenCalledWith(SAMPLE_SONG);
  });

  it('agrega la clase is-selected cuando selected es true', () => {
    component.selected = true;
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('.song-card'));
    expect(card.nativeElement.classList).toContain('is-selected');
  });
});
