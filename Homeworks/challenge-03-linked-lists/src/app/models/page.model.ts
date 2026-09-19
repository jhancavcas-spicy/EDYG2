/** Representa una página visitada dentro del historial del navegador. */
export interface Page {
  id: number;
  name: string;
  url?: string;
}
