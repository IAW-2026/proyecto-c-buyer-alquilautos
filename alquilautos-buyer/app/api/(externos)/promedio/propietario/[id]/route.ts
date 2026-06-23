import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

type Props = { params: Promise<{ id: string }> };

// Obtiene la calificación promedio y cantidad de reseñas de un propietario consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { getToken } = await auth();
  const token = await getToken();
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/promedio/propietario/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "No encontrado" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener promedio" }, { status: 500 });
  }
}