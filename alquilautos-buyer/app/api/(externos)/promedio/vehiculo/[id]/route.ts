import { NextResponse } from "next/server";
import { calificacionesVehiculos } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

//Obtiene la calificación promedio y cantidad de reseñas de un vehículo consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/promedio/vehiculo/${id}`);
  // return NextResponse.json(await res.json());
  const cal = calificacionesVehiculos.find((c) => c.id_vehiculo === Number(id));
  if (!cal) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({
    id_vehiculo: cal.id_vehiculo,
    calificacion_promedio: cal.calificacion_promedio,
    cantidad_resenas: cal.cantidad_resenas,
  });
}