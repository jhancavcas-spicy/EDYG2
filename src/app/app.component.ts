import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClinicaService } from './clinica.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  nombre = '';
  edad = 0;
  motivo = '';
  mensaje = '';
  verInverso = false;

  constructor(public clinica: ClinicaService) {}

  ngOnInit(): void {
    // cada 10 segundos cambia el medico de guardia
    setInterval(() => {
      this.clinica.medicos.avanzar();
    }, 10000);
  }

  get pacientes() {
    return this.clinica.pacientes.obtenerTodos();
  }

  get historial() {
    return this.verInverso
      ? this.clinica.historial.obtenerInverso()
      : this.clinica.historial.obtenerTodos();
  }

  get medicos() {
    return this.clinica.medicos.obtenerTodos();
  }

  get medicoActual() {
    return this.clinica.medicos.obtenerActual();
  }

  get comite() {
    return this.clinica.comite.obtenerTodos();
  }

  get miembroActual() {
    return this.clinica.comite.obtenerActual();
  }

  agregarPaciente(): void {
    if (this.nombre === '' || this.motivo === '') {
      this.mensaje = 'Faltan datos del paciente';
      return;
    }

    this.clinica.agregarPaciente(this.nombre, this.edad, this.motivo);
    this.mensaje = this.nombre + ' entro a la lista de espera';

    this.nombre = '';
    this.edad = 0;
    this.motivo = '';
  }

  atenderPaciente(): void {
    const paciente = this.clinica.atenderPaciente();

    if (paciente === null) {
      this.mensaje = 'No hay pacientes en espera';
    } else {
      this.mensaje = 'Atendido: ' + paciente.nombre;
    }
  }

  cambiarMedico(): void {
    this.clinica.medicos.avanzar();
  }
}
