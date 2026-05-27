import {
  calificacionesVehiculos,
  calificacionesPropietarios,
  type CalificacionVehiculo,
  type CalificacionPropietario,
} from "@/app/data/feedback";

export async function getCalificacionVehiculo(idVehiculo: number): Promise<CalificacionVehiculo | null> {
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/vehiculo/${idVehiculo}/promedio`);
  // return res.json();
  return calificacionesVehiculos.find((c) => c.id_vehiculo === idVehiculo) ?? null;
}

export async function getCalificacionPropietario(idPropietario: number): Promise<CalificacionPropietario | null> {
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/propietario/${idPropietario}/promedio`);
  // return res.json();
  return calificacionesPropietarios.find((c) => c.id_propietario === idPropietario) ?? null;
}

export async function getCalificacionesVehiculos(): Promise<CalificacionVehiculo[]> {
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/vehiculo/promedios`);
  // return res.json();
  return calificacionesVehiculos;
}

export async function getCalificacionesPropietarios(): Promise<CalificacionPropietario[]> {
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/propietario/promedios`);
  // return res.json();
  return calificacionesPropietarios;
}