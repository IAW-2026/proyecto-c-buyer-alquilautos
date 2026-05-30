import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Crea una nueva reserva enviando los datos a la Seller App con el ID del alquilador logueado (VERIFICADO)

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { id_vehiculo, id_propietario, fecha_inicio, fecha_final } = body;

  if (!id_vehiculo || !id_propietario || !fecha_inicio || !fecha_final) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  // TODO: reemplazar por llamada real a la Seller App
  // const response = await fetch(`${process.env.SELLER_APP_URL}/api/reserva`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ id_alquilador: userId, id_vehiculo, id_propietario, fecha_inicio, fecha_final }),
  // });

  console.log("POST /api/reserva →", {
    id_alquilador: userId,
    id_vehiculo,
    id_propietario,
    fecha_inicio,
    fecha_final,
  });

  // Respuesta mockeada
  return NextResponse.json({ id_reserva: Math.floor(Math.random() * 9000) + 1000 }, { status: 201 });
}