export type CalificacionVehiculo = {
  id_vehiculo: string;
  calificacion_promedio: number;
  cantidad_resenas: number;
};

export type CalificacionPropietario = {
  id_propietario: string;
  calificacion_promedio: number;
  cantidad_resenas: number;
};

export type ResenaVehiculo = {
  id_resena: string;
  id_reserva: string;
  id_emisor: string;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_limpieza: number;
  calificacion_estado: number;
  calificacion_comodidad: number;
};

export type ResenaPropietario = {
  id_resena: string;
  id_reserva: string;
  id_emisor: string;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_comunicacion: number;
  calificacion_puntualidad: number;
};

export type ResenaAlquilador = {
  id_resena: string;
  id_reserva: string;
  id_emisor: string;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_comunicacion: number;
  calificacion_puntualidad: number;
  calificacion_devolucion: number;
};

export type RespuestaResena = {
  id_respuesta: string;
  id_resena: string;
  id_autor: string;
  comentario: string;
  fecha_creacion: string;
};

export type ResumenVehiculo = {
  id_vehiculo: string;
  resumen: string;
};

export type ResumenPropietario = {
  id_propietario: string;
  resumen: string;
};

export type ResumenAlquilador = {
  id_alquilador: string;
  resumen: string;
};
