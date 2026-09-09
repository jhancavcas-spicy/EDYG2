# Sistema de turnos - Clinica

Parcial 1. Aplicacion Angular que gestiona turnos de pacientes usando listas
enlazadas implementadas a mano (no se usan arreglos para guardar el estado).

## Ejecutar

```bash
npm install
npm start
```

Abrir http://localhost:4200

## Estructuras usadas

| Requisito | Estructura | Archivo |
| --- | --- | --- |
| Pacientes en espera | Lista simplemente enlazada | `src/app/estructuras/lista-simple.ts` |
| Historial de atencion | Lista doblemente enlazada | `src/app/estructuras/lista-doble.ts` |
| Medicos de guardia | Lista circular | `src/app/estructuras/lista-circular.ts` |
| Comite administrativo | Lista circular doble | `src/app/estructuras/lista-circular-doble.ts` |

- El medico de guardia cambia solo cada 10 segundos con un `setInterval` en
  `app.component.ts`.
- Al atender un paciente se elimina de la lista simple y se agrega a la lista
  doble (`ClinicaService.atenderPaciente()`).
