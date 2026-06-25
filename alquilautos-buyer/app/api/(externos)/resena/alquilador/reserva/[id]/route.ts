import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

type Props = { params: Promise<{ id: string }> };

// Obtiene la reseña del alquilador de una reserva específica consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { userId, getToken } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/alquilador/reserva/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener reseña" }, { status: 500 });
  }
}
