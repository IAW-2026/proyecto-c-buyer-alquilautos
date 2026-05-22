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