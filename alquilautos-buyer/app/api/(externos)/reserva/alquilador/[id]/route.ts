import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { reservasMock } from "@/app/data/reservas";

type Props = {
  params: Promise<{ id: string }>;
};

//Obtiene todas las reservas de un alquilador específico consultando a la Seller App, solo permite acceder a las propias (VERIFICADO)

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;

  if (userId !== id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  // TODO: reemplazar por fetch real a la Seller App
  // const response = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/alquilador/${id}`);
  // const reservas = await response.json();

  return NextResponse.json(reservasMock, { status: 200 });
}