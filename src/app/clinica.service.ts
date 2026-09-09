import { Injectable } from '@angular/core';
import { Paciente, Medico, MiembroComite } from './models';
import { ListaSimple } from './estructuras/lista-simple';
import { ListaDoble } from './estructuras/lista-doble';
import { ListaCircular } from './estructuras/lista-circular';
import { ListaCircularDoble } from './estructuras/lista-circular-doble';

@Injectable({ providedIn: 'root' })
export class ClinicaService {
  pacientes = new ListaSimple<Paciente>();
  historial = new ListaDoble<Paciente>();
  medicos = new ListaCircular<Medico>();
  comite = new ListaCircularDoble<MiembroComite>();

  private contadorId = 1;

  constructor() {
    this.medicos.agregar({ id: 1, nombre: 'Dr. Carlos Rivas', especialidad: 'Cardiologia' });
    this.medicos.agregar({ id: 2, nombre: 'Dra. Ana Pineda', especialidad: 'Pediatria' });
    this.medicos.agregar({ id: 3, nombre: 'Dr. Pedro Salas', especialidad: 'Medicina general' });

    this.comite.agregar({ id: 1, nombre: 'Laura Mejia', cargo: 'Directora' });
    this.comite.agregar({ id: 2, nombre: 'Carlos Duque', cargo: 'Administrador' });
    this.comite.agregar({ id: 3, nombre: 'Andrea Rojas', cargo: 'Coordinadora' });

    this.agregarPaciente('Juan Ospina', 30, 'Dolor abdominal');
    this.agregarPaciente('Maria Lopez', 25, 'Fiebre');
  }

  agregarPaciente(nombre: string, edad: number, motivo: string): void {
    this.pacientes.agregar({ id: this.contadorId++, nombre, edad, motivo });
  }

  // sale de la lista simple y entra a la lista doble
  atenderPaciente(): Paciente | null {
    const paciente = this.pacientes.eliminarPrimero();

    if (paciente !== null) {
      this.historial.agregar(paciente);
    }
    return paciente;
  }
}
