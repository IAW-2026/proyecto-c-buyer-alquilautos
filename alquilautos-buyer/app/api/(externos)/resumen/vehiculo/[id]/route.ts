import { NextResponse } from "next/server";
import { resumenVehiculo } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

// Obtiene el resumen de reseñas de un vehículo generado por IA consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resumen/vehiculo/${id}`);
  // return NextResponse.json(await res.json());
  return NextResponse.json({ ...resumenVehiculo, id_vehiculo: Number(id) });
}