import { TrieNode } from './trie-node';

/**
 * Trie (árbol de prefijos) implementado desde cero para el buscador
 * predictivo de canciones.
 *
 * No utiliza ninguna librería externa: cada operación recorre y modifica
 * directamente los TrieNode mediante sus Map de hijos.
 *
 * La búsqueda es insensible a mayúsculas/minúsculas: internamente todo se
 * normaliza con toLowerCase(), pero el título original se conserva en
 * `originalTitles` para mostrarlo correctamente en la interfaz.
 */
export class Trie {
  private readonly root: TrieNode;
  private size = 0;

  constructor() {
    this.root = new TrieNode();
  }

  /** Normaliza un texto para que la búsqueda sea insensible a mayúsculas. */
  private normalize(text: string): string {
    return text.trim().toLowerCase();
  }

  /**
   * Inserta una canción en el Trie.
   * @param title Título original de la canción (se conserva tal cual).
   */
  insert(title: string): void {
    if (!title || title.trim().length === 0) {
      return;
    }

    const normalized = this.normalize(title);
    let current = this.root;

    for (const char of normalized) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode(char));
      }
      current = current.children.get(char)!;
    }

    if (!current.isEndOfTitle) {
      current.isEndOfTitle = true;
      this.size++;
    }

    // Evita duplicar el mismo título original varias veces.
    if (!current.originalTitles.includes(title)) {
      current.originalTitles.push(title);
    }
  }

  /**
   * Recorre el Trie siguiendo los caracteres de `text` y devuelve el nodo
   * final, o null si el prefijo/palabra no existe.
   */
  private traverse(text: string): TrieNode | null {
    const normalized = this.normalize(text);
    let current = this.root;

    for (const char of normalized) {
      const next = current.children.get(char);
      if (!next) {
        return null;
      }
      current = next;
    }

    return current;
  }

  /** Comprueba si una canción con ese título exacto existe en el Trie. */
  search(title: string): boolean {
    const node = this.traverse(title);
    return node !== null && node.isEndOfTitle;
  }

  /** Comprueba si existe al menos una canción que comience con `prefix`. */
  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  /**
   * Recolecta recursivamente todos los títulos originales almacenados en
   * el subárbol que cuelga de `node`.
   */
  private collectTitles(node: TrieNode, results: string[], limit: number): void {
    if (results.length >= limit) {
      return;
    }

    if (node.isEndOfTitle) {
      for (const title of node.originalTitles) {
        if (results.length >= limit) {
          return;
        }
        results.push(title);
      }
    }

    for (const child of node.children.values()) {
      if (results.length >= limit) {
        return;
      }
      this.collectTitles(child, results, limit);
    }
  }

  /**
   * Devuelve las canciones cuyo título comienza con `prefix`, usando
   * realmente la estructura Trie (no un filtro sobre un arreglo).
   * @param prefix Prefijo de búsqueda.
   * @param limit Número máximo de sugerencias a devolver (por defecto 10).
   */
  getSuggestions(prefix: string, limit: number = 10): string[] {
    if (!prefix || prefix.trim().length === 0) {
      return [];
    }

    const node = this.traverse(prefix);
    if (!node) {
      return [];
    }

    const results: string[] = [];
    this.collectTitles(node, results, limit);
    return results;
  }

  /** Cantidad de títulos distintos almacenados en el Trie. */
  count(): number {
    return this.size;
  }

  /** Elimina todas las canciones del Trie (útil para pruebas). */
  clear(): void {
    this.root.children.clear();
    this.size = 0;
  }
}
