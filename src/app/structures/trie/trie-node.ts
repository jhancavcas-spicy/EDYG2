/**
 * Nodo del Trie.
 *
 * Cada nodo representa un único carácter dentro de un título de canción.
 * Los hijos se guardan en un Map para permitir cualquier alfabeto
 * (incluidas tildes, ñ, espacios, números, etc.) sin depender de un
 * arreglo fijo de 26 posiciones.
 */
export class TrieNode {
  /** Carácter que representa este nodo (cadena vacía solo en la raíz). */
  char: string;

  /** Mapa de nodos hijos: carácter -> TrieNode. */
  children: Map<string, TrieNode>;

  /** Indica si en este nodo termina un título de canción completo. */
  isEndOfTitle: boolean;

  /**
   * Títulos originales (con mayúsculas/minúsculas y tildes reales) que
   * terminan exactamente en este nodo. Se guarda como arreglo porque,
   * en teoría, dos canciones distintas podrían normalizarse al mismo
   * título en minúsculas (por ejemplo, mismo nombre de dos artistas).
   */
  originalTitles: string[];

  constructor(char: string = '') {
    this.char = char;
    this.children = new Map<string, TrieNode>();
    this.isEndOfTitle = false;
    this.originalTitles = [];
  }
}
