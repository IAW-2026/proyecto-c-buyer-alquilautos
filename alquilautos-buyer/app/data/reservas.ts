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
  id_reserva: number;
  id_vehiculo: number;
  id_propietario: number;
  id_alquilador: string;
  fecha_inicio: string;
  fecha_final: string;
  estado: EstadoReserva;
};

export const reservasMock: Reserva[] = [
  {
    id_reserva: 1001,
    id_vehiculo: 897660, // Kia Rio - Lucia Benitez
    id_propietario: 458976,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-06-01",
    fecha_final: "2026-06-05",
    estado: "Pendiente",
  },
  {
    id_reserva: 1002,
    id_vehiculo: 897661, // Mazda 3 - Martin Suarez
    id_propietario: 458977,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-06-10",
    fecha_final: "2026-06-12",
    estado: "Pagada",
  },
  {
    id_reserva: 1003,
    id_vehiculo: 897662, // Citroen C3 - Camila Rios
    id_propietario: 458978,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-05-01",
    fecha_final: "2026-05-05",
    estado: "Aceptada",
  },
  {
    id_reserva: 1004,
    id_vehiculo: 897663, // Toyota Yaris - Nicolas Herrera
    id_propietario: 458979,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-04-10",
    fecha_final: "2026-04-15",
    estado: "Coordinada",
  },
  {
    id_reserva: 1005,
    id_vehiculo: 897664, // Volkswagen Polo - Valentina Costa
    id_propietario: 458980,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-03-01",
    fecha_final: "2026-03-03",
    estado: "Rechazada",
  },
  {
    id_reserva: 1006,
    id_vehiculo: 897665, // Ford Fiesta - Lucia Benitez
    id_propietario: 458976,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-02-15",
    fecha_final: "2026-02-18",
    estado: "Finalizada",
  },
  {
    id_reserva: 1007,
    id_vehiculo: 897666, // Chevrolet Tracker - Martin Suarez
    id_propietario: 458977,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-01-10",
    fecha_final: "2026-01-12",
    estado: "Cancelada",
  },
  {
    id_reserva: 1008,
    id_vehiculo: 897667, // Renault Duster - Camila Rios
    id_propietario: 458978,
    id_alquilador: "user_mock",
    fecha_inicio: "2026-01-20",
    fecha_final: "2026-01-25",
    estado: "Entregada",
  },
];