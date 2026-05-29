import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { reservasMock } from "@/app/data/reservas";

type Props = {
  params: Promise<{ id_reserva: string }>;
};

// Obtiene los datos de una reserva específica por su ID consultando a la Seller App

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id_reserva } = await params;

  // TODO: reemplazar por fetch real a la Seller App
  // const response = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/${id_reserva}`);
  // const reserva = await response.json();
  // return NextResponse.json(reserva, { status: 200 });

  const reserva = reservasMock.find((r) => r.id_reserva === Number(id_reserva));

  if (!reserva) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
  }

  return NextResponse.json(reserva, { status: 200 });
}

// Actualiza el estado de una reserva enviando el cambio a la Seller App

export async function PATCH(req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id_reserva } = await params;
  const body = await req.json();
  const { estado } = body;

  if (!estado) {
    return NextResponse.json({ error: "Estado requerido" }, { status: 400 });
  }

  // TODO: reemplazar por fetch real a la Seller App
  // const response = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/${id_reserva}`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ estado }),
  // });

  console.log(`PATCH /api/reserva/${id_reserva} →`, { userId, estado });

  return NextResponse.json({ success: true }, { status: 200 });
}