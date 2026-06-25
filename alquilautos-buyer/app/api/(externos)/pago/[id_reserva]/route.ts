import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{ id_reserva: string }>;
};

// Notifica a la Payments App que el usuario generó el link de pago para una reserva, enviando el estado pendiente 

export async function PATCH(req: Request, { params }: Props) {
  const { userId, getToken } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id_reserva } = await params;
  const body = await req.json();

  try {
    const res = await fetch(`${process.env.PAYMENTS_APP_URL}/api/pago/${id_reserva}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al actualizar pago" }, { status: res.status });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al actualizar pago" }, { status: 500 });
  }
}