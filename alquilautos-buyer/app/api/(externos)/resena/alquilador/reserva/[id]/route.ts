import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { resenasAlquiladores } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

// Obtiene la reseña del alquilador de una reserva específica consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/alquilador/reserva/${id}`);
  // return NextResponse.json(await res.json());
  return NextResponse.json(resenasAlquiladores[0] ?? null);
}