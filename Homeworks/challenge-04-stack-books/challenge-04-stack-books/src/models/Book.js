/** Modelo y datos mock para los libros de la Stack. */

let nextId = 1;

/** Crea un objeto Book con un id único generado internamente. */
export function createBook({ name, isbn, author, editorial }) {
  return {
    id: nextId++,
    name,
    isbn,
    author,
    editorial,
  };
}

/** Libros iniciales para llenar la pila al arrancar la aplicación. */
export const mockBooks = [
  createBook({
    name: 'Cien años de soledad',
    isbn: '978-0307474728',
    author: 'Gabriel García Márquez',
    editorial: 'Editorial Sudamericana',
  }),
  createBook({
    name: 'El principito',
    isbn: '978-0156012195',
    author: 'Antoine de Saint-Exupéry',
    editorial: 'Reynal & Hitchcock',
  }),
  createBook({
    name: '1984',
    isbn: '978-0451524935',
    author: 'George Orwell',
    editorial: 'Secker & Warburg',
  }),
  createBook({
    name: 'Rayuela',
    isbn: '978-8437604572',
    author: 'Julio Cortázar',
    editorial: 'Editorial Sudamericana',
  }),
];
