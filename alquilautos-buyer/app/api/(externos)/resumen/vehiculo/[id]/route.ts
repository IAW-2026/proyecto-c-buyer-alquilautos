import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

type Props = { params: Promise<{ id: string }> };

// Obtiene el resumen de reseñas de un vehículo generado por IA consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { getToken } = await auth();
  const token = await getToken();
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resumen/vehiculo/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "No encontrado" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener resumen" }, { status: 500 });
  }
}
