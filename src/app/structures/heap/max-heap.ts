import { Song } from '../../models/song.model';

/**
 * Max Heap implementado desde cero sobre un arreglo, usado para el
 * ranking de canciones más populares.
 *
 * La prioridad de cada elemento es su número de reproducciones
 * (`song.plays`). La propiedad de Max Heap se mantiene siempre:
 * el padre tiene una cantidad de reproducciones mayor o igual que
 * la de sus hijos.
 *
 * No se usa Array.sort() en ningún método: toda reorganización se hace
 * mediante percolateUp/percolateDown, tal como pide el enunciado.
 */
export class MaxHeap {
  private heap: Song[] = [];

  // ---------------------------------------------------------------------
  // Utilidades de índices
  // ---------------------------------------------------------------------

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private rightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  /** Intercambia dos elementos del heap por índice. */
  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  // ---------------------------------------------------------------------
  // Reorganización
  // ---------------------------------------------------------------------

  /** Reubica hacia arriba el elemento en `index` hasta restaurar la propiedad de Max Heap. */
  private percolateUp(index: number): void {
    let current = index;

    while (current > 0) {
      const parent = this.parentIndex(current);
      if (this.heap[current].plays > this.heap[parent].plays) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  /** Reubica hacia abajo el elemento en `index` hasta restaurar la propiedad de Max Heap. */
  private percolateDown(index: number): void {
    let current = index;
    const length = this.heap.length;

    while (true) {
      const left = this.leftChildIndex(current);
      const right = this.rightChildIndex(current);
      let largest = current;

      if (left < length && this.heap[left].plays > this.heap[largest].plays) {
        largest = left;
      }
      if (right < length && this.heap[right].plays > this.heap[largest].plays) {
        largest = right;
      }

      if (largest === current) {
        break;
      }

      this.swap(current, largest);
      current = largest;
    }
  }

  // ---------------------------------------------------------------------
  // API pública
  // ---------------------------------------------------------------------

  /** Inserta una canción en el heap, respetando la propiedad de Max Heap. */
  insert(song: Song): void {
    this.heap.push(song);
    this.percolateUp(this.heap.length - 1);
  }

  /** Consulta (sin extraer) la canción más popular. */
  peek(): Song | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  /** Extrae y devuelve la canción más popular, reorganizando el heap. */
  extractMax(): Song | null {
    if (this.heap.length === 0) {
      return null;
    }

    const max = this.heap[0];
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.percolateDown(0);
    }

    return max;
  }

  /** Cantidad de canciones actualmente en el heap. */
  size(): number {
    return this.heap.length;
  }

  /** Indica si el heap está vacío. */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Construye el heap completo a partir de un arreglo de canciones en
   * O(n), aplicando percolateDown desde el último nodo interno hacia la
   * raíz (algoritmo clásico de heapify).
   */
  heapify(songs: Song[]): void {
    this.heap = [...songs];
    const lastParent = this.parentIndex(this.heap.length - 1);

    for (let i = lastParent; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  /**
   * Devuelve las K canciones más escuchadas, ordenadas de mayor a menor
   * número de reproducciones, extrayendo repetidamente el máximo del
   * heap. No utiliza Array.sort(): el orden surge de extractMax().
   *
   * Esta operación consume una copia del heap, por lo que el heap
   * original (this.heap) permanece intacto para seguir insertando o
   * consultando después de pedir el ranking.
   */
  getTopSongs(k: number): Song[] {
    const snapshot = new MaxHeap();
    snapshot.heapify(this.heap);

    const top: Song[] = [];
    const limit = Math.min(k, snapshot.size());

    for (let i = 0; i < limit; i++) {
      const song = snapshot.extractMax();
      if (song) {
        top.push(song);
      }
    }

    return top;
  }

  /** Devuelve una copia superficial del arreglo interno (útil para depurar/mostrar). */
  toArray(): Song[] {
    return [...this.heap];
  }
}
