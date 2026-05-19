import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id_reserva: string }>;
};

export async function POST(_req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id_reserva } = await params;

  // TODO: reemplazar por fetch real a la Seller App
  // await fetch(`${process.env.SELLER_APP_URL}/api/alquiler/${id_reserva}/cancelar`, {
  //   method: "POST",
  // });

  console.log(`POST /api/reserva/${id_reserva}/cancelar → userId: ${userId}`);

  return NextResponse.json({ success: true }, { status: 200 });
}