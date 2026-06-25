import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

//  Cancela la entrega asociada a una reserva enviando la solicitud a la Shipping App. 

export async function PATCH(_req: Request, { params }: Props) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.SHIPPING_APP_URL}/api/entregas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    const text = await res.text();
    console.error(`[cancelar entrega] status=${res.status} body=${text}`);

    if (!res.ok) {
      let errorMsg = "Error al cancelar entrega";
      try { errorMsg = JSON.parse(text)?.error ?? errorMsg; } catch { /* body no es JSON */ }
      return NextResponse.json({ error: errorMsg }, { status: res.status });
    }

    try {
      return NextResponse.json(JSON.parse(text), { status: 200 });
    } catch {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
  } catch (err) {
    console.error("[cancelar entrega] fetch error:", err);
    return NextResponse.json({ error: "Error al cancelar entrega" }, { status: 500 });
  }
}