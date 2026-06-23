import { auth } from "@clerk/nextjs/server";
import type { CalificacionVehiculo, CalificacionPropietario } from "@/app/data/feedback";

export async function getCalificacionVehiculo(idVehiculo: string): Promise<CalificacionVehiculo | null> {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/promedio/vehiculo/${idVehiculo}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getCalificacionPropietario(idPropietario: string): Promise<CalificacionPropietario | null> {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/promedio/propietario/${idPropietario}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
