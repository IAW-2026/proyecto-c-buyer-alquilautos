import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Crea una nueva reserva enviando los datos a la Seller App con el ID del alquilador logueado 

export async function POST(req: Request) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const body = await req.json();
  const { id_vehiculo, id_propietario, fecha_inicio, fecha_final } = body;

  if (!id_vehiculo || !id_propietario || !fecha_inicio || !fecha_final) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const toSellerDate = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}-${m}-${y}`;
  };

  try {
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        id_alquilador: userId,
        id_vehiculo,
        id_propietario,
        fecha_inicio: toSellerDate(fecha_inicio),
        fecha_final: toSellerDate(fecha_final),
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al crear reserva" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.data ?? data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear reserva" }, { status: 500 });
  }
}