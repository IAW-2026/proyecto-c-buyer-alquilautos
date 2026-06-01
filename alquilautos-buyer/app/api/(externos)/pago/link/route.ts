import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Obtiene el link de pago de Mercado Pago para una reserva consultando a la Payments App 

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id_reserva = searchParams.get("id_reserva");

  if (!id_reserva) {
    return NextResponse.json({ error: "id_reserva requerido" }, { status: 400 });
  }

  // TODO: reemplazar por fetch real a la Payments App
  // const res = await fetch(`${process.env.PAYMENTS_APP_URL}/api/pago/link?id_reserva=${id_reserva}`);
  // return NextResponse.json(await res.json());

  return NextResponse.json({ link: "link-mercado-pago" });
}