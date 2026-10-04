import { useRef, useState } from 'react';
import { Stack } from '../structures/Stack.js';
import { createBook, mockBooks } from '../models/Book.js';
import BookForm from '../components/BookForm.jsx';
import BookList from '../components/BookList.jsx';

/**
 * Pantalla principal del Challenge 04.
 * Mantiene UNA instancia de Stack a lo largo de toda la vida del
 * componente (useRef) y usa un contador auxiliar (useState) solo
 * para forzar el re-render de React cuando la Stack cambia —
 * la lógica de datos siempre vive dentro de la clase Stack.
 */
export default function BooksStack() {
  const stackRef = useRef(null);
  if (stackRef.current === null) {
    stackRef.current = new Stack(mockBooks);
  }

  const [, setVersion] = useState(0);
  const [lastAction, setLastAction] = useState('');

  function refresh() {
    setVersion((v) => v + 1);
  }

  function handleAddBook(data) {
    const book = createBook(data);
    stackRef.current.push(book);
    setLastAction(`Se agregó "${book.name}" al TOP de la pila.`);
    refresh();
  }

  function handlePeek() {
    const top = stackRef.current.peek();
    setLastAction(
      top ? `Peek: "${top.name}" está en el TOP (no se eliminó).` : 'Peek: la pila está vacía.'
    );
  }

  function handlePop() {
    const removed = stackRef.current.pop();
    setLastAction(
      removed ? `Pop: se eliminó "${removed.name}" de la pila.` : 'Pop: la pila ya estaba vacía.'
    );
    refresh();
  }

  const books = stackRef.current.print();
  const top = stackRef.current.peek();

  return (
    <div className="page">
      <header className="page-header">
        <h1>Stack de Libros</h1>
        <p className="page-subtitle">
          Estructura LIFO — el último libro agregado es el primero en salir.
        </p>
      </header>

      <section className="panel">
        <h2>Agregar libro</h2>
        <BookForm onAddBook={handleAddBook} />
      </section>

      <section className="panel info-panel">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Tamaño</span>
            <span className="info-value">{stackRef.current.size()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">¿Vacía?</span>
            <span className="info-value">{stackRef.current.isEmpty() ? 'Sí' : 'No'}</span>
          </div>
          <div className="info-item info-item-wide">
            <span className="info-label">Top actual</span>
            <span className="info-value">{top ? top.name : '—'}</span>
          </div>
        </div>
        <div className="info-actions">
          <button type="button" className="btn-secondary" onClick={handlePeek}>
            Peek
          </button>
          <button type="button" className="btn-danger" onClick={handlePop}>
            Pop
          </button>
        </div>
      </section>

      {lastAction && <p className="last-action">{lastAction}</p>}

      <section className="panel">
        <h2>Contenido de la pila</h2>
        <BookList books={books} />
      </section>
    </div>
  );
}
