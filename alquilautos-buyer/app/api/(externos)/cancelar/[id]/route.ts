import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

//  Cancela la entrega asociada a una reserva enviando la solicitud a la Shipping App. 

export async function PATCH(_req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;

  // TODO: reemplazar por fetch real a la Shipping App
  // await fetch(`${process.env.SHIPPING_APP_URL}/api/entrega/${id}/cancelar`, {
  //   method: "PATCH",
  // });

  console.log(`PATCH /api/cancelar/${id} → id_reserva: ${id}`);

  return NextResponse.json({ success: true }, { status: 200 });
}