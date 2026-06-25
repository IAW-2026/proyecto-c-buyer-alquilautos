import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

// Obtiene los horarios disponibles de entrega y devolución para una reserva consultando a la Shipping App 

export async function GET(_req: Request, { params }: Props) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.SHIPPING_APP_URL}/api/horario/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener horarios" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener horarios" }, { status: 500 });
  }
}