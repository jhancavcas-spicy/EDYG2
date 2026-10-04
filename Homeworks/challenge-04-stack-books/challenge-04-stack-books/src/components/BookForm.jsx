import { useState } from 'react';

/** Formulario controlado para crear un nuevo libro y agregarlo a la Stack. */
export default function BookForm({ onAddBook }) {
  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');
  const [editorial, setEditorial] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) {
      return;
    }

    onAddBook({
      name: name.trim(),
      isbn: isbn.trim(),
      author: author.trim(),
      editorial: editorial.trim(),
    });

    setName('');
    setIsbn('');
    setAuthor('');
    setEditorial('');
  }

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Cien años de soledad"
        />
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN</label>
        <input
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Ej: 978-0307474728"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Autor</label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ej: Gabriel García Márquez"
        />
      </div>

      <div className="form-group">
        <label htmlFor="editorial">Editorial</label>
        <input
          id="editorial"
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
          placeholder="Ej: Editorial Sudamericana"
        />
      </div>

      <button type="submit" className="btn-primary">
        Agregar libro
      </button>
    </form>
  );
}
