import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Obtiene el link de pago de Mercado Pago para una reserva consultando a la Payments App 

export async function GET(req: Request) {
  const { userId, getToken } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { searchParams } = new URL(req.url);
  const id_reserva = searchParams.get("id_reserva");

  if (!id_reserva) {
    return NextResponse.json({ error: "id_reserva requerido" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.PAYMENTS_APP_URL}/api/pago/link?id_reserva=${id_reserva}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener link de pago" }, { status: res.status });
    }

    const data = await res.json();
    const link = data.link_pago ?? data.link ?? null;
    return NextResponse.json({ link }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener link de pago" }, { status: 500 });
  }
}