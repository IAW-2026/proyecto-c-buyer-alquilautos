import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ id: string }>;
};

// Obtiene los datos completos de un propietario por su ID consultando a la Seller App

export async function GET(_req: Request, { params }: Props) {
  const { getToken } = await auth();
  const token = await getToken();
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Propietario no encontrado" }, { status: res.status });
    }

    const data = await res.json();
    const propietario = data.data ?? data;
    return NextResponse.json(propietario, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener propietario" }, { status: 500 });
  }
}