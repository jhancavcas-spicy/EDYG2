import { Graph } from './graph';
import { Song } from '../../models/song.model';

function makeSong(id: string, title: string): Song {
  return { id, title, artist: 'Artist', plays: 0 };
}

describe('Graph (no dirigido)', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
  });

  describe('addNode', () => {
    it('agrega canciones como nodos', () => {
      graph.addNode(makeSong('1', 'Song A'));
      graph.addNode(makeSong('2', 'Song B'));

      expect(graph.size()).toBe(2);
    });

    it('no duplica un nodo si se agrega dos veces', () => {
      graph.addNode(makeSong('1', 'Song A'));
      graph.addNode(makeSong('1', 'Song A (actualizada)'));

      expect(graph.size()).toBe(1);
      expect(graph.searchNode('1')?.title).toBe('Song A (actualizada)');
    });
  });

  describe('addEdge', () => {
    beforeEach(() => {
      graph.addNode(makeSong('1', 'Song A'));
      graph.addNode(makeSong('2', 'Song B'));
      graph.addNode(makeSong('3', 'Song C'));
    });

    it('crea una relación bidireccional entre dos canciones', () => {
      graph.addEdge('1', '2');

      const neighborsOf1 = graph.getNeighbors('1').map((s) => s.id);
      const neighborsOf2 = graph.getNeighbors('2').map((s) => s.id);

      expect(neighborsOf1).toContain('2');
      expect(neighborsOf2).toContain('1');
    });

    it('verifica que las relaciones sean bidireccionales incluso con múltiples conexiones', () => {
      graph.addEdge('1', '2');
      graph.addEdge('1', '3');
      graph.addEdge('2', '3');

      expect(graph.getNeighbors('1').map((s) => s.id).sort()).toEqual(['2', '3']);
      expect(graph.getNeighbors('2').map((s) => s.id).sort()).toEqual(['1', '3']);
      expect(graph.getNeighbors('3').map((s) => s.id).sort()).toEqual(['1', '2']);
    });

    it('lanza un error si alguna de las canciones no existe', () => {
      expect(() => graph.addEdge('1', '999')).toThrowError();
    });

    it('no crea una auto-relación de una canción consigo misma', () => {
      graph.addEdge('1', '1');
      expect(graph.getNeighbors('1')).toEqual([]);
    });
  });

  describe('getNeighbors', () => {
    it('devuelve un arreglo vacío si la canción no tiene relaciones', () => {
      graph.addNode(makeSong('1', 'Song A'));
      expect(graph.getNeighbors('1')).toEqual([]);
    });

    it('devuelve un arreglo vacío si la canción no existe', () => {
      expect(graph.getNeighbors('no-existe')).toEqual([]);
    });
  });

  describe('searchNode', () => {
    it('encuentra una canción existente por id', () => {
      graph.addNode(makeSong('1', 'Song A'));
      expect(graph.searchNode('1')?.title).toBe('Song A');
    });

    it('devuelve null si la canción no existe', () => {
      expect(graph.searchNode('no-existe')).toBeNull();
    });
  });

  describe('removeNode', () => {
    beforeEach(() => {
      graph.addNode(makeSong('1', 'Song A'));
      graph.addNode(makeSong('2', 'Song B'));
      graph.addNode(makeSong('3', 'Song C'));
      graph.addEdge('1', '2');
      graph.addEdge('1', '3');
      graph.addEdge('2', '3');
    });

    it('elimina el nodo y todas sus conexiones', () => {
      const removed = graph.removeNode('1');

      expect(removed).toBeTrue();
      expect(graph.size()).toBe(2);
      expect(graph.searchNode('1')).toBeNull();
    });

    it('elimina las referencias al nodo eliminado desde sus antiguos vecinos', () => {
      graph.removeNode('1');

      expect(graph.getNeighbors('2').map((s) => s.id)).not.toContain('1');
      expect(graph.getNeighbors('3').map((s) => s.id)).not.toContain('1');
    });

    it('devuelve false si se intenta eliminar un nodo que no existe', () => {
      expect(graph.removeNode('no-existe')).toBeFalse();
    });
  });

  describe('printAdjacency', () => {
    it('genera una representación en texto de la lista de adyacencia', () => {
      graph.addNode(makeSong('1', 'Song A'));
      graph.addNode(makeSong('2', 'Song B'));
      graph.addEdge('1', '2');

      const output = graph.printAdjacency();

      expect(output).toContain('Song A');
      expect(output).toContain('Song B');
    });
  });
});
