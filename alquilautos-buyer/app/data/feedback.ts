export type CalificacionVehiculo = {
  id_vehiculo: number;
  calificacion_promedio: number;
  cantidad_resenas: number;
};

export type CalificacionPropietario = {
  id_propietario: number;
  calificacion_promedio: number;
  cantidad_resenas: number;
};

export const calificacionesVehiculos: CalificacionVehiculo[] = [
  { id_vehiculo: 897650, calificacion_promedio: 4.6, cantidad_resenas: 12 },
  { id_vehiculo: 897651, calificacion_promedio: 4.3, cantidad_resenas: 8 },
  { id_vehiculo: 897652, calificacion_promedio: 4.8, cantidad_resenas: 15 },
  { id_vehiculo: 897653, calificacion_promedio: 4.2, cantidad_resenas: 6 },
  { id_vehiculo: 897654, calificacion_promedio: 4.4, cantidad_resenas: 10 },
  { id_vehiculo: 897655, calificacion_promedio: 4.1, cantidad_resenas: 5 },
  { id_vehiculo: 897656, calificacion_promedio: 4.7, cantidad_resenas: 18 },
  { id_vehiculo: 897657, calificacion_promedio: 4.2, cantidad_resenas: 7 },
  { id_vehiculo: 897658, calificacion_promedio: 4.0, cantidad_resenas: 4 },
  { id_vehiculo: 897659, calificacion_promedio: 4.3, cantidad_resenas: 9 },
  { id_vehiculo: 897660, calificacion_promedio: 4.1, cantidad_resenas: 5 },
  { id_vehiculo: 897661, calificacion_promedio: 4.6, cantidad_resenas: 11 },
  { id_vehiculo: 897662, calificacion_promedio: 4.0, cantidad_resenas: 3 },
  { id_vehiculo: 897663, calificacion_promedio: 4.5, cantidad_resenas: 14 },
  { id_vehiculo: 897664, calificacion_promedio: 4.2, cantidad_resenas: 7 },
  { id_vehiculo: 897665, calificacion_promedio: 3.9, cantidad_resenas: 4 },
  { id_vehiculo: 897666, calificacion_promedio: 4.4, cantidad_resenas: 10 },
  { id_vehiculo: 897667, calificacion_promedio: 4.3, cantidad_resenas: 8 },
  { id_vehiculo: 897668, calificacion_promedio: 3.8, cantidad_resenas: 3 },
  { id_vehiculo: 897669, calificacion_promedio: 4.6, cantidad_resenas: 13 },
];

export const calificacionesPropietarios: CalificacionPropietario[] = [
  { id_propietario: 458976, calificacion_promedio: 4.7, cantidad_resenas: 20 },
  { id_propietario: 458977, calificacion_promedio: 4.5, cantidad_resenas: 16 },
  { id_propietario: 458978, calificacion_promedio: 4.8, cantidad_resenas: 22 },
  { id_propietario: 458979, calificacion_promedio: 4.6, cantidad_resenas: 18 },
  { id_propietario: 458980, calificacion_promedio: 4.9, cantidad_resenas: 25 },
];

export type ResenaVehiculo = {
  id_resena: number;
  id_reserva: number;
  id_emisor: number;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_limpieza: number;
  calificacion_estado: number;
  calificacion_comodidad: number;
};

export type ResenaPropietario = {
  id_resena: number;
  id_reserva: number;
  id_emisor: number;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_comunicacion: number;
  calificacion_puntualidad: number;
};

export type ResenaAlquilador = {
  id_resena: number;
  id_reserva: number;
  id_emisor: number;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_comunicacion: number;
  calificacion_puntualidad: number;
  calificacion_devolucion: number;
};

export type RespuestaResena = {
  id_respuesta: number;
  id_resena: number;
  id_autor: number;
  comentario: string;
  fecha_creacion: string;
};

export const resenasVehiculos: ResenaVehiculo[] = [
  {
    id_resena: 1,
    id_reserva: 100,
    id_emisor: 1,
    calificacion_general: 5,
    descripcion: "Auto impecable, muy cómodo y limpio.",
    fecha_creacion: "03-06-2026",
    calificacion_limpieza: 5,
    calificacion_estado: 5,
    calificacion_comodidad: 4,
  },
];

export const resenasPropietarios: ResenaPropietario[] = [
  {
    id_resena: 2,
    id_reserva: 100,
    id_emisor: 1,
    calificacion_general: 4,
    descripcion: "Buen servicio, muy atento.",
    fecha_creacion: "02-06-2026",
    calificacion_comunicacion: 4,
    calificacion_puntualidad: 4,
  },
];

export const resenasAlquiladores: ResenaAlquilador[] = [
  {
    id_resena: 3,
    id_reserva: 100,
    id_emisor: 2,
    calificacion_general: 5,
    descripcion: "Muy buen cliente, devolvió el auto en perfectas condiciones.",
    fecha_creacion: "01-06-2026",
    calificacion_comunicacion: 5,
    calificacion_puntualidad: 5,
    calificacion_devolucion: 5,
  },
];

// Agregar al final de feedback.ts

export type ResumenVehiculo = {
  id_vehiculo: number;
  calificacion_promedio: number;
  cantidad_resenas: number;
  descripcion: string;
  promedios: {
    calificacion_limpieza: number;
    calificacion_estado: number;
    calificacion_comodidad: number;
  };
};

export type ResumenPropietario = {
  id_propietario: number;
  calificacion_promedio: number;
  cantidad_resenas: number;
  descripcion: string;
  promedios: {
    calificacion_comunicacion: number;
    calificacion_puntualidad: number;
  };
};

export const resumenVehiculo: ResumenVehiculo = {
  id_vehiculo: 0,
  calificacion_promedio: 4.6,
  cantidad_resenas: 12,
  descripcion: "Vehículo en excelente estado, muy limpio y cómodo según la mayoría de los usuarios.",
  promedios: {
    calificacion_limpieza: 4.9,
    calificacion_estado: 4.7,
    calificacion_comodidad: 4.8,
  },
};

export const resumenPropietario: ResumenPropietario = {
  id_propietario: 0,
  calificacion_promedio: 4.7,
  cantidad_resenas: 20,
  descripcion: "Propietario muy atento y puntual, con excelente comunicación durante todo el proceso.",
  promedios: {
    calificacion_comunicacion: 4.8,
    calificacion_puntualidad: 4.6,
  },
};