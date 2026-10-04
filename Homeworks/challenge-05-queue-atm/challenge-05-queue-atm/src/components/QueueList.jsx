const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function formatTime(date) {
  return new Date(date).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Muestra el contenido de la Queue en orden de llegada
 * (frente primero), tal como lo entrega Queue.print().
 */
export default function QueueList({ people }) {
  if (people.length === 0) {
    return (
      <div className="empty-state">
        <p>La cola está vacía. Agrega una persona para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="queue-visual">
      <span className="queue-edge-label">PRIMERO / SIGUIENTE EN SER ATENDIDO</span>

      <div className="queue-items">
        {people.map((person, index) => (
          <div key={person.id} className={`queue-card${index === 0 ? ' front' : ''}`}>
            {index === 0 && <span className="front-badge">Frente</span>}
            <strong className="queue-card-title">{person.name}</strong>
            <span className="queue-card-meta">Llegada: {formatTime(person.arrivalDate)}</span>
            <span className="queue-card-meta">
              Retiro: {currencyFormatter.format(person.withdrawalAmount)}
            </span>
          </div>
        ))}
      </div>

      <span className="queue-edge-label">ÚLTIMO EN LA COLA</span>
    </div>
  );
}
