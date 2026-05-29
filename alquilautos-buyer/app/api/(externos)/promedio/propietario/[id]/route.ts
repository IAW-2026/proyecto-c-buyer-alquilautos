import { NextResponse } from "next/server";
import { calificacionesPropietarios } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

//Obtiene la calificación promedio y cantidad de reseñas de un propietario consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/promedio/propietario/${id}`);
  // return NextResponse.json(await res.json());
  const cal = calificacionesPropietarios.find((c) => c.id_propietario === Number(id));
  if (!cal) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({
    id_propietario: cal.id_propietario,
    calificacion_promedio: cal.calificacion_promedio,
    cantidad_resenas: cal.cantidad_resenas,
  });
}