import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { resenasPropietarios } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

// Obtiene la reseña del propietario de una reserva específica consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/propietario/reserva/${id}`);
  // return NextResponse.json(await res.json());
  return NextResponse.json(resenasPropietarios[0] ?? null);
}