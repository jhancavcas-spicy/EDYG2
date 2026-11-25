import { Trie } from './trie';

describe('Trie', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe('insert', () => {
    it('inserta canciones y actualiza el contador', () => {
      trie.insert('Bohemian Rhapsody');
      trie.insert('Billie Jean');

      expect(trie.count()).toBe(2);
    });

    it('no incrementa el contador al insertar el mismo título dos veces', () => {
      trie.insert('Imagine');
      trie.insert('Imagine');

      expect(trie.count()).toBe(1);
    });

    it('ignora títulos vacíos o solo espacios', () => {
      trie.insert('');
      trie.insert('   ');

      expect(trie.count()).toBe(0);
    });
  });

  describe('search', () => {
    beforeEach(() => {
      trie.insert('Bohemian Rhapsody');
      trie.insert('Billie Jean');
      trie.insert('Thriller');
    });

    it('encuentra un título existente', () => {
      expect(trie.search('Bohemian Rhapsody')).toBeTrue();
    });

    it('devuelve false para un título inexistente', () => {
      expect(trie.search('Stairway to Heaven')).toBeFalse();
    });

    it('la búsqueda es insensible a mayúsculas y minúsculas', () => {
      expect(trie.search('bohemian rhapsody')).toBeTrue();
      expect(trie.search('BILLIE JEAN')).toBeTrue();
      expect(trie.search('tHrIlLeR')).toBeTrue();
    });

    it('no confunde un prefijo con una palabra completa', () => {
      // "Thrill" es un prefijo de "Thriller" pero no es una canción en sí.
      expect(trie.search('Thrill')).toBeFalse();
    });
  });

  describe('startsWith', () => {
    beforeEach(() => {
      trie.insert('Bohemian Rhapsody');
      trie.insert('Bad Romance');
      trie.insert('Billie Jean');
    });

    it('detecta un prefijo existente', () => {
      expect(trie.startsWith('Bo')).toBeTrue();
      expect(trie.startsWith('Ba')).toBeTrue();
    });

    it('detecta prefijos con mayúsculas y minúsculas mezcladas', () => {
      expect(trie.startsWith('bO')).toBeTrue();
      expect(trie.startsWith('BI')).toBeTrue();
    });

    it('devuelve false para un prefijo que no existe', () => {
      expect(trie.startsWith('Xy')).toBeFalse();
    });
  });

  describe('getSuggestions', () => {
    beforeEach(() => {
      trie.insert('Bohemian Rhapsody');
      trie.insert('Bad Romance');
      trie.insert('Billie Jean');
      trie.insert('Thriller');
    });

    it('devuelve todas las canciones que coinciden con el prefijo', () => {
      const suggestions = trie.getSuggestions('B').sort();
      expect(suggestions).toEqual(['Bad Romance', 'Billie Jean', 'Bohemian Rhapsody'].sort());
    });

    it('conserva el título original (mayúsculas/tildes) en las sugerencias', () => {
      const suggestions = trie.getSuggestions('bohemian');
      expect(suggestions).toContain('Bohemian Rhapsody');
    });

    it('devuelve un arreglo vacío si no hay coincidencias', () => {
      expect(trie.getSuggestions('Zzz')).toEqual([]);
    });

    it('respeta el límite de sugerencias solicitado', () => {
      trie.insert('Billy Idol');
      trie.insert('Billy Joel');
      const suggestions = trie.getSuggestions('Bi', 1);
      expect(suggestions.length).toBe(1);
    });

    it('usa realmente el Trie: localizar el nodo del prefijo antes de recolectar', () => {
      const spy = spyOn<any>(trie, 'collectTitles').and.callThrough();
      trie.getSuggestions('Bil');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('elimina todas las canciones del Trie', () => {
      trie.insert('Imagine');
      trie.clear();
      expect(trie.count()).toBe(0);
      expect(trie.search('Imagine')).toBeFalse();
    });
  });
});
