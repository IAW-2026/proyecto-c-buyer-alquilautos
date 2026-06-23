export type EstadoReserva =
  | "Pendiente"
  | "Aceptada"
  | "Rechazada"
  | "Cancelada"
  | "Coordinada"
  | "Pagada"
  | "Entregada"
  | "Finalizada";

export type Reserva = {
  id_reserva: string;
  id_vehiculo: string;
  id_propietario: string;
  id_alquilador: string;
  fecha_inicio: string;
  fecha_final: string;
  estado: EstadoReserva;
};
