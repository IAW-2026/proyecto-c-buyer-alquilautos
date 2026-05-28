import {
  calificacionesVehiculos,
  calificacionesPropietarios,
  type CalificacionVehiculo,
  type CalificacionPropietario,
} from "@/app/data/feedback";

export async function getCalificacionVehiculo(idVehiculo: number): Promise<CalificacionVehiculo | null> {
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/promedio/vehiculo/${idVehiculo}`);
  // return res.json();
  return calificacionesVehiculos.find((c) => c.id_vehiculo === idVehiculo) ?? null;
}

export async function getCalificacionPropietario(idPropietario: number): Promise<CalificacionPropietario | null> {
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/promedio/propietario/${idPropietario}`);
  // return res.json();
  return calificacionesPropietarios.find((c) => c.id_propietario === idPropietario) ?? null;
}
