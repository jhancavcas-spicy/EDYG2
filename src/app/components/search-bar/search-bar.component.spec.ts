import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { MusicDataService } from '../../services/music-data.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let musicData: MusicDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    musicData = TestBed.inject(MusicDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no muestra sugerencias cuando el campo está vacío', () => {
    component.query = '';
    component.onInputChange();

    expect(component.suggestions).toEqual([]);
    expect(component.isOpen).toBeFalse();
  });

  it('consulta el Trie (vía MusicDataService) y muestra sugerencias reales por prefijo', () => {
    const spy = spyOn(musicData, 'getSuggestions').and.callThrough();

    component.query = 'Bad';
    component.onInputChange();

    expect(spy).toHaveBeenCalledWith('Bad', 8);
    expect(component.suggestions).toContain('Bad Romance');
    expect(component.isOpen).toBeTrue();
  });

  it('muestra el mensaje de "sin resultados" cuando el prefijo no existe', () => {
    component.query = 'Zzzzz';
    component.onInputChange();

    expect(component.suggestions).toEqual([]);
    expect(component.showNoResults).toBeTrue();
  });

  it('al seleccionar una sugerencia, selecciona la canción y emite songSelected', () => {
    spyOn(component.songSelected, 'emit');

    component.selectSuggestion('Bad Romance');

    expect(component.query).toBe('Bad Romance');
    expect(component.isOpen).toBeFalse();
    expect(component.songSelected.emit).toHaveBeenCalled();
  });

  it('clear() reinicia el estado del buscador', () => {
    component.query = 'Bad';
    component.onInputChange();
    component.clear();

    expect(component.query).toBe('');
    expect(component.suggestions).toEqual([]);
    expect(component.isOpen).toBeFalse();
  });
});
