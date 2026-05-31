import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { resumenAlquilador } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

// Obtiene el resumen de reseñas de un alquilador generado por IA consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resumen/alquilador/${id}`);
  // return NextResponse.json(await res.json());
  return NextResponse.json({ ...resumenAlquilador, id_alquilador: id });
}