import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { resenasPropietarios } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

//Obtiene las reseñas hechas sobre un propietario para una reserva consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/propietario/${id}`);
  // return NextResponse.json(await res.json());
  const resenas = resenasPropietarios.filter((r) => r.id_reserva === Number(id));
  return NextResponse.json({ resenas });
}