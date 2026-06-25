import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

// Obtiene todas las reservas de un alquilador específico consultando a la Seller App, solo permite acceder a las propias

export async function GET(_req: Request, { params }: Props) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id } = await params;

  if (userId !== id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/alquilador/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener reservas" }, { status: res.status });
    }

    const data = await res.json();
    const reservas = data.data?.reservas ?? data.reservas ?? [];
    return NextResponse.json(reservas, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener reservas" }, { status: 500 });
  }
}