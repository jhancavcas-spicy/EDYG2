/** Modelo y datos mock para las personas de la Queue del cajero. */

let nextId = 1;

/**
 * Crea un objeto Person. La arrivalDate se asigna automáticamente
 * por el sistema (el usuario nunca la escribe).
 */
export function createPerson({ name, withdrawalAmount }) {
  return {
    id: nextId++,
    name,
    withdrawalAmount: Number(withdrawalAmount),
    arrivalDate: new Date(),
  };
}

function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60 * 1000);
}

/**
 * Personas iniciales para llenar la cola al arrancar la aplicación,
 * con fechas de llegada ya en orden cronológico (la primera en
 * llegar queda de primera en la cola, como corresponde a FIFO).
 */
export const mockPersons = [
  {
    id: nextId++,
    name: 'Carlos Pérez',
    withdrawalAmount: 200000,
    arrivalDate: minutesAgo(12),
  },
  {
    id: nextId++,
    name: 'María Gómez',
    withdrawalAmount: 500000,
    arrivalDate: minutesAgo(9),
  },
  {
    id: nextId++,
    name: 'Juan Torres',
    withdrawalAmount: 100000,
    arrivalDate: minutesAgo(5),
  },
];
