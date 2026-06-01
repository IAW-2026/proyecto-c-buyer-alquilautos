import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Confirma los horarios de entrega y devolución de una reserva enviándolos a la Shipping App 
export async function PATCH(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { id_reserva, horarios } = body;

  if (!id_reserva || !horarios) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  // TODO: reemplazar por fetch real a la Shipping App
  // const response = await fetch(`${process.env.SHIPPING_APP_URL}/api/entrega/horario`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ id_reserva, horarios }),
  // });
  // const data = await response.json();
  // return NextResponse.json(data, { status: 200 });

  console.log("PATCH /api/entrega/horario →", { userId, id_reserva, horarios });

  return NextResponse.json(
    {
      id_reserva,
      horarios,
    },
    { status: 200 },
  );
}