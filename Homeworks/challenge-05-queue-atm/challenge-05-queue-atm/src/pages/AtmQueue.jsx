import { useRef, useState } from 'react';
import { Queue } from '../structures/Queue.js';
import { createPerson, mockPersons } from '../models/Person.js';
import PersonForm from '../components/PersonForm.jsx';
import QueueList from '../components/QueueList.jsx';

/**
 * Pantalla principal del Challenge 05.
 * Mantiene UNA instancia de Queue a lo largo de toda la vida del
 * componente (useRef) y usa un contador auxiliar (useState) solo
 * para forzar el re-render de React cuando la Queue cambia —
 * la lógica de datos siempre vive dentro de la clase Queue.
 */
export default function AtmQueue() {
  const queueRef = useRef(null);
  if (queueRef.current === null) {
    queueRef.current = new Queue(mockPersons);
  }

  const [, setVersion] = useState(0);
  const [lastAction, setLastAction] = useState('');

  function refresh() {
    setVersion((v) => v + 1);
  }

  function handleAddPerson(data) {
    const person = createPerson(data);
    queueRef.current.enqueue(person);
    setLastAction(`Se agregó a "${person.name}" al final de la cola.`);
    refresh();
  }

  function handlePeek() {
    const front = queueRef.current.peek();
    setLastAction(
      front
        ? `Peek: "${front.name}" es el primero de la cola (no se eliminó).`
        : 'Peek: la cola está vacía.'
    );
  }

  function handleDequeue() {
    const removed = queueRef.current.dequeue();
    setLastAction(
      removed
        ? `Dequeue: se atendió y salió "${removed.name}" de la cola.`
        : 'Dequeue: la cola ya estaba vacía.'
    );
    refresh();
  }

  const people = queueRef.current.print();
  const front = queueRef.current.peek();
  const last = people[people.length - 1];

  return (
    <div className="page">
      <header className="page-header">
        <h1>Queue de Personas - Cajero</h1>
        <p className="page-subtitle">
          Estructura FIFO — la primera persona en llegar es la primera en ser atendida.
        </p>
      </header>

      <section className="panel">
        <h2>Agregar persona</h2>
        <PersonForm onAddPerson={handleAddPerson} />
      </section>

      <section className="panel info-panel">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Tamaño</span>
            <span className="info-value">{queueRef.current.size()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">¿Vacía?</span>
            <span className="info-value">{queueRef.current.isEmpty() ? 'Sí' : 'No'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Primera persona</span>
            <span className="info-value">{front ? front.name : '—'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Última persona</span>
            <span className="info-value">{last ? last.name : '—'}</span>
          </div>
        </div>
        <div className="info-actions">
          <button type="button" className="btn-secondary" onClick={handlePeek}>
            Peek
          </button>
          <button type="button" className="btn-danger" onClick={handleDequeue}>
            Dequeue
          </button>
        </div>
      </section>

      {lastAction && <p className="last-action">{lastAction}</p>}

      <section className="panel">
        <h2>Contenido de la cola</h2>
        <QueueList people={people} />
      </section>
    </div>
  );
}
