export interface Paciente {
  id: number;
  nombre: string;
  edad: number;
  motivo: string;
}

export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
}

export interface MiembroComite {
  id: number;
  nombre: string;
  cargo: string;
}
