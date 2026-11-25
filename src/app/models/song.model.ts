/**
 * Modelo de datos de una canción dentro de la plataforma educativa.
 *
 * Esta interfaz es el contrato que comparten las tres estructuras de datos
 * del proyecto (Trie, Max Heap y Grafo no dirigido) y los componentes
 * visuales del dashboard.
 */
export interface Song {
  /** Identificador único de la canción (usado como id de nodo en el grafo). */
  id: string;

  /** Título original de la canción, tal como se muestra en la interfaz. */
  title: string;

  /** Artista o banda. */
  artist: string;

  /** Cantidad de reproducciones (usada como prioridad en el Max Heap). */
  plays: number;

  /** URL o referencia de la portada del álbum (opcional). */
  cover?: string;

  /** Nombre del álbum (opcional). */
  album?: string;

  /** Género musical, útil para mostrar contexto en las tarjetas. */
  genre?: string;

  /** Duración de la canción en formato mm:ss (opcional, solo visual). */
  duration?: string;
}

/**
 * Par canción-vecinos usado para construir la lista de adyacencia inicial
 * del grafo de recomendaciones. Se mantiene separado del modelo `Song`
 * porque las relaciones son datos de inicialización, no datos propios
 * de la canción.
 */
export interface SongRelation {
  songId: string;
  relatedIds: string[];
}
