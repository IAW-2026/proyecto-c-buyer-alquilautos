import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { reservasMock } from "@/app/data/reservas";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // TODO: reemplazar por fetch real a la Seller App
  // const response = await fetch(`${process.env.SELLER_APP_URL}/api/alquiler?id_alquilador=${userId}`);
  // const reservas = await response.json();

  return NextResponse.json(reservasMock, { status: 200 });
}