/**
 * Muestra el contenido de la Stack ya ordenado del TOP hacia el BOTTOM
 * (tal como lo entrega Stack.print()).
 */
export default function BookList({ books }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>La pila está vacía. Agrega un libro para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="stack-visual">
      <span className="stack-edge-label">TOP</span>

      <div className="stack-items">
        {books.map((book, index) => (
          <div key={book.id} className={`stack-card${index === 0 ? ' top' : ''}`}>
            {index === 0 && <span className="top-badge">TOP</span>}
            <strong className="stack-card-title">{book.name}</strong>
            <span className="stack-card-meta">{book.author}</span>
            <span className="stack-card-meta">ISBN: {book.isbn}</span>
            <span className="stack-card-meta">{book.editorial}</span>
          </div>
        ))}
      </div>

      <span className="stack-edge-label">BOTTOM</span>
    </div>
  );
}
