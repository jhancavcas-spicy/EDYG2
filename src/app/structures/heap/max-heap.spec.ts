import { MaxHeap } from './max-heap';
import { Song } from '../../models/song.model';

function makeSong(id: string, plays: number): Song {
  return { id, title: `Song ${id}`, artist: 'Artist', plays };
}

/** Comprueba recursivamente que cada padre tenga más o igual reproducciones que sus hijos. */
function isValidMaxHeap(heap: MaxHeap): boolean {
  const arr = heap.toArray();
  for (let i = 0; i < arr.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < arr.length && arr[left].plays > arr[i].plays) {
      return false;
    }
    if (right < arr.length && arr[right].plays > arr[i].plays) {
      return false;
    }
  }
  return true;
}

describe('MaxHeap', () => {
  let heap: MaxHeap;

  beforeEach(() => {
    heap = new MaxHeap();
  });

  describe('insert', () => {
    it('inserta canciones y mantiene la propiedad de Max Heap', () => {
      heap.insert(makeSong('a', 10));
      heap.insert(makeSong('b', 50));
      heap.insert(makeSong('c', 5));
      heap.insert(makeSong('d', 80));
      heap.insert(makeSong('e', 30));

      expect(isValidMaxHeap(heap)).toBeTrue();
      expect(heap.size()).toBe(5);
    });
  });

  describe('peek', () => {
    it('devuelve null si el heap está vacío', () => {
      expect(heap.peek()).toBeNull();
    });

    it('consulta la canción más popular sin extraerla', () => {
      heap.insert(makeSong('a', 10));
      heap.insert(makeSong('b', 99));
      heap.insert(makeSong('c', 40));

      expect(heap.peek()?.id).toBe('b');
      expect(heap.size()).toBe(3); // no se extrajo nada
    });
  });

  describe('extractMax', () => {
    it('devuelve null si el heap está vacío', () => {
      expect(heap.extractMax()).toBeNull();
    });

    it('extrae las canciones en orden descendente de reproducciones', () => {
      const plays = [10, 99, 40, 1, 77, 23, 56];
      plays.forEach((p, i) => heap.insert(makeSong(`s${i}`, p)));

      const extracted: number[] = [];
      let song = heap.extractMax();
      while (song) {
        extracted.push(song.plays);
        song = heap.extractMax();
      }

      const expected = [...plays].sort((a, b) => b - a);
      expect(extracted).toEqual(expected);
    });

    it('mantiene la propiedad de Max Heap después de cada extracción', () => {
      [15, 3, 42, 7, 99, 1, 64].forEach((p, i) => heap.insert(makeSong(`s${i}`, p)));

      heap.extractMax();
      expect(isValidMaxHeap(heap)).toBeTrue();
      heap.extractMax();
      expect(isValidMaxHeap(heap)).toBeTrue();
    });
  });

  describe('heapify', () => {
    it('construye un Max Heap válido a partir de un arreglo desordenado', () => {
      const songs = [12, 45, 3, 78, 23, 1, 99, 5].map((p, i) => makeSong(`s${i}`, p));
      heap.heapify(songs);

      expect(isValidMaxHeap(heap)).toBeTrue();
      expect(heap.size()).toBe(songs.length);
      expect(heap.peek()?.plays).toBe(99);
    });
  });

  describe('percolateUp / percolateDown / swap', () => {
    it('percolateUp reubica un elemento recién insertado hacia la raíz si corresponde', () => {
      heap.insert(makeSong('a', 10));
      heap.insert(makeSong('b', 20));
      heap.insert(makeSong('c', 5));

      // Insertamos manualmente un valor muy alto y llamamos percolateUp
      (heap as any).heap.push(makeSong('d', 1000));
      (heap as any).percolateUp((heap as any).heap.length - 1);

      expect(heap.peek()?.id).toBe('d');
    });

    it('percolateDown reubica la raíz hacia abajo si es menor que sus hijos', () => {
      (heap as any).heap = [makeSong('a', 1), makeSong('b', 50), makeSong('c', 40)];
      (heap as any).percolateDown(0);

      expect(isValidMaxHeap(heap)).toBeTrue();
      expect(heap.peek()?.id).toBe('b');
    });

    it('swap intercambia correctamente dos posiciones del heap', () => {
      (heap as any).heap = [makeSong('a', 1), makeSong('b', 2)];
      (heap as any).swap(0, 1);

      expect((heap as any).heap[0].id).toBe('b');
      expect((heap as any).heap[1].id).toBe('a');
    });
  });

  describe('size', () => {
    it('refleja la cantidad de elementos insertados y extraídos', () => {
      expect(heap.size()).toBe(0);
      heap.insert(makeSong('a', 1));
      heap.insert(makeSong('b', 2));
      expect(heap.size()).toBe(2);
      heap.extractMax();
      expect(heap.size()).toBe(1);
    });
  });

  describe('getTopSongs', () => {
    it('devuelve las K canciones más escuchadas ordenadas de mayor a menor', () => {
      const plays = [120, 5, 890, 340, 15, 999, 60];
      plays.forEach((p, i) => heap.insert(makeSong(`s${i}`, p)));

      const top3 = heap.getTopSongs(3);
      expect(top3.map((s) => s.plays)).toEqual([999, 890, 340]);
    });

    it('no modifica el heap original al calcular el ranking', () => {
      [10, 20, 30].forEach((p, i) => heap.insert(makeSong(`s${i}`, p)));
      const sizeBefore = heap.size();

      heap.getTopSongs(2);

      expect(heap.size()).toBe(sizeBefore);
      expect(heap.peek()?.plays).toBe(30);
    });

    it('si K es mayor que el tamaño del heap, devuelve todas las canciones', () => {
      [5, 10].forEach((p, i) => heap.insert(makeSong(`s${i}`, p)));
      const top = heap.getTopSongs(10);
      expect(top.length).toBe(2);
    });
  });
});
