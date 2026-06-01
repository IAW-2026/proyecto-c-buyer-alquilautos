import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

//Envía una nueva reseña de vehículo o propietario a la Feedback App (VERIFICADO)

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();

  // TODO: reemplazar por fetch real a la Feedback App
  // const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(body),
  // });
  // return NextResponse.json(await res.json(), { status: res.status });

  console.log("Reseña recibida:", body);
  return NextResponse.json({ ok: true }, { status: 201 });
}