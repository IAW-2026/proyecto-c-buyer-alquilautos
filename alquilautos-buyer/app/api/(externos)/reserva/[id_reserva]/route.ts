import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id_reserva: string }>;
};

// Obtiene los datos de una reserva específica por su ID consultando a la Seller App

export async function GET(_req: Request, { params }: Props) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id_reserva } = await params;

  try {
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/${id_reserva}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Reserva no encontrada" }, { status: res.status });
    }

    const data = await res.json();
    const reserva = data.data ?? data;
    return NextResponse.json(reserva, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener reserva" }, { status: 500 });
  }
}

// Actualiza el estado de una reserva enviando el cambio a la Seller App

export async function PATCH(req: Request, { params }: Props) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id_reserva } = await params;
  const body = await req.json();
  const { estado } = body;

  if (!estado) {
    return NextResponse.json({ error: "Estado requerido" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/${id_reserva}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ estado }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al actualizar reserva" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.data ?? data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al actualizar reserva" }, { status: 500 });
  }
}
