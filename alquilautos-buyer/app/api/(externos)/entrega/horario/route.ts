import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Confirma los horarios de entrega y devolución de una reserva enviándolos a la Shipping App 
export async function PATCH(req: Request) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const body = await req.json();
  const { id_reserva, horarios } = body;

  if (!id_reserva || !horarios) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.SHIPPING_APP_URL}/api/entrega/horario`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id_reserva, horarios }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al confirmar horarios" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al confirmar horarios" }, { status: 500 });
  }
}