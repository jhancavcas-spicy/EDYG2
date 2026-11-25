import { Song } from '../../models/song.model';

/**
 * Grafo NO dirigido implementado desde cero mediante lista de adyacencia,
 * usado para representar relaciones de similitud entre canciones y así
 * calcular recomendaciones.
 *
 * Cada canción es un nodo. Si se conecta la canción A con la canción B,
 * la conexión B -> A se crea automáticamente, por lo que el grafo nunca
 * queda con una relación en un solo sentido.
 */
export class Graph {
  /** Datos de cada canción, indexados por id. */
  private nodes: Map<string, Song>;

  /** Lista de adyacencia: id de canción -> conjunto de ids relacionados. */
  private adjacency: Map<string, Set<string>>;

  constructor() {
    this.nodes = new Map<string, Song>();
    this.adjacency = new Map<string, Set<string>>();
  }

  /** Agrega una canción como nodo del grafo (si no existía todavía). */
  addNode(song: Song): void {
    if (!this.nodes.has(song.id)) {
      this.nodes.set(song.id, song);
      this.adjacency.set(song.id, new Set<string>());
    } else {
      // Permite actualizar los datos de una canción ya existente
      // (por ejemplo, si cambian sus reproducciones) sin perder sus relaciones.
      this.nodes.set(song.id, song);
    }
  }

  /**
   * Conecta dos canciones como similares. La relación es simétrica:
   * conectar A con B también conecta B con A.
   */
  addEdge(songAId: string, songBId: string): void {
    if (!this.nodes.has(songAId) || !this.nodes.has(songBId)) {
      throw new Error(
        `No se puede crear la relación: ambas canciones deben existir primero (addNode). songA=${songAId}, songB=${songBId}`
      );
    }

    if (songAId === songBId) {
      return; // una canción no se recomienda a sí misma
    }

    this.adjacency.get(songAId)!.add(songBId);
    this.adjacency.get(songBId)!.add(songAId); // no dirigido: también B -> A
  }

  /** Devuelve las canciones conectadas (relacionadas) con `songId`. */
  getNeighbors(songId: string): Song[] {
    const neighborIds = this.adjacency.get(songId);
    if (!neighborIds) {
      return [];
    }

    const neighbors: Song[] = [];
    for (const id of neighborIds) {
      const song = this.nodes.get(id);
      if (song) {
        neighbors.push(song);
      }
    }
    return neighbors;
  }

  /** Busca una canción por id dentro del grafo. Devuelve null si no existe. */
  searchNode(songId: string): Song | null {
    return this.nodes.get(songId) ?? null;
  }

  /** Elimina una canción y todas sus relaciones (en ambos sentidos). */
  removeNode(songId: string): boolean {
    if (!this.nodes.has(songId)) {
      return false;
    }

    // Elimina esta canción de la lista de vecinos de todas sus conexiones.
    const neighborIds = this.adjacency.get(songId) ?? new Set<string>();
    for (const neighborId of neighborIds) {
      this.adjacency.get(neighborId)?.delete(songId);
    }

    this.adjacency.delete(songId);
    this.nodes.delete(songId);
    return true;
  }

  /** Cantidad de canciones (nodos) en el grafo. */
  size(): number {
    return this.nodes.size;
  }

  /** Devuelve todas las canciones del grafo. */
  getAllNodes(): Song[] {
    return [...this.nodes.values()];
  }

  /**
   * Muestra (y devuelve como texto) la lista de adyacencia completa del
   * grafo, útil para depuración y para demostrar que las relaciones son
   * bidireccionales.
   */
  printAdjacency(): string {
    const lines: string[] = [];

    for (const [id, neighbors] of this.adjacency.entries()) {
      const song = this.nodes.get(id);
      const title = song ? song.title : id;
      const neighborTitles = [...neighbors]
        .map((neighborId) => this.nodes.get(neighborId)?.title ?? neighborId)
        .join(', ');
      lines.push(`${title} -> [${neighborTitles}]`);
    }

    const output = lines.join('\n');
    // eslint-disable-next-line no-console
    console.log(output);
    return output;
  }
}
