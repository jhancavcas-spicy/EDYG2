import { useState } from 'react';

/**
 * Formulario controlado para crear una nueva persona.
 * Solo pide nombre y monto — la fecha de llegada la asigna
 * el sistema automáticamente al hacer enqueue().
 */
export default function PersonForm({ onAddPerson }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || amount === '' || Number(amount) <= 0) {
      return;
    }

    onAddPerson({
      name: name.trim(),
      withdrawalAmount: Number(amount),
    });

    setName('');
    setAmount('');
  }

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Carlos Pérez"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Monto a retirar</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Ej: 200000"
        />
      </div>

      <p className="hint">
        La fecha y hora de llegada se asignan automáticamente al agregar a la cola.
      </p>

      <button type="submit" className="btn-primary">
        Agregar a la cola
      </button>
    </form>
  );
}
