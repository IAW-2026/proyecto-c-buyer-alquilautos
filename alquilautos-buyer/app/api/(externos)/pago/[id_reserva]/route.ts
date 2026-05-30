import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{ id_reserva: string }>;
};

// Notifica a la Payments App que el usuario generó el link de pago para una reserva, enviando el estado pendiente (VERIFICADO)

export async function PATCH(_req: Request, { params }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id_reserva } = await params;

  // TODO: reemplazar por fetch real a la Payments App
  // await fetch(`${process.env.PAYMENTS_APP_URL}/api/pago/${id_reserva}`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ estado: "pendiente" }),
  // });

  console.log(`PATCH /api/pago/${id_reserva} → estado: pendiente`);
  return NextResponse.json({ ok: true }, { status: 200 });
}