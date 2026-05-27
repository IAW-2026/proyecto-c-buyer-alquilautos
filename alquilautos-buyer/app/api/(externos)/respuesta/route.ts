import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();

  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/respuesta`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(body),
  // });
  // return NextResponse.json(await res.json(), { status: res.status });

  console.log("Respuesta recibida:", body);
  return NextResponse.json({
    id_respuesta: 1,
    id_resena: body.id_resena,
    id_autor: body.id_autor,
    comentario: body.comentario,
    fecha_creacion: new Date().toLocaleDateString("es-AR"),
  }, { status: 201 });
}