import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id_reserva: string }>;
};

export async function POST(req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id_reserva } = await params;
  const body = await req.json();
  const { hora_entrega, hora_devolucion } = body;

  if (!hora_entrega || !hora_devolucion) {
    return NextResponse.json({ error: "Faltan horarios requeridos" }, { status: 400 });
  }

  // TODO: reemplazar por fetch real a la Shipping App
  // await fetch(`${process.env.SHIPPING_APP_URL}/api/entrega`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ idReserva: id_reserva, horaEntrega: hora_entrega, horaDevolucion: hora_devolucion }),
  // });

  console.log(`POST /api/reserva/${id_reserva}/coordinar →`, {
    userId,
    hora_entrega,
    hora_devolucion,
  });

  return NextResponse.json({ success: true }, { status: 200 });
}