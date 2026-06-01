import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

// Obtiene los horarios disponibles de entrega y devolución para una reserva consultando a la Shipping App 

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;

  // TODO: reemplazar por fetch real a la Shipping App
  // const response = await fetch(`${process.env.SHIPPING_APP_URL}/api/horario/${id}`);
  // const data = await response.json();
  // return NextResponse.json(data, { status: 200 });

  // Mock
  return NextResponse.json(
    {
      id_reserva: Number(id),
      id_entrega: 50,
      horarios: [
        {
          tipo: "entrega",
          fecha: "2026-06-01",
          hora_inicio_disponible: "14:00",
          hora_fin_disponible: "19:00",
        },
        {
          tipo: "devolucion",
          fecha: "2026-06-05",
          hora_inicio_disponible: "14:00",
          hora_fin_disponible: "19:00",
        },
      ],
    },
    { status: 200 },
  );
}