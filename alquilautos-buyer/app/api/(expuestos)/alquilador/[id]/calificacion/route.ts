import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

type Props = {
  params: Promise<{ id: string }>;
};

// Actualiza la calificación promedio de un alquilador, recibe un número entre 0 y 5.

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;

  const body = await req.json();
  const { calificacion } = body;

  if (calificacion === undefined || typeof calificacion !== "number") {
    return NextResponse.json({ error: "calificacion requerida" }, { status: 400 });
  }

  if (calificacion < 0 || calificacion > 5) {
    return NextResponse.json({ error: "calificacion debe estar entre 0 y 5" }, { status: 400 });
  }

  const user = await bd.user.update({
    where: { id },
    data: { calificacion },
  });

  return NextResponse.json({ calificacion: user.calificacion }, { status: 200 });
}