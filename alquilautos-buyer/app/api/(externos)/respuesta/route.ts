import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Envía la respuesta del alquilador a una reseña hecha sobre él a la Feedback App

export async function POST(req: Request) {
  const { userId, getToken } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const body = await req.json();

  try {
    const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/respuesta`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al crear respuesta" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear respuesta" }, { status: 500 });
  }
}
