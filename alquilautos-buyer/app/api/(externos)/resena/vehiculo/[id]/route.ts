import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { resenasVehiculosPublicacion } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

// Obtiene todas las reseñas hechas sobre un vehículo por su id consultando a la Feedback App

export async function GET(_req: Request, { params }: Props) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/vehiculo/${id}`);
  // return NextResponse.json(await res.json());
  return NextResponse.json({ resenas: resenasVehiculosPublicacion });
}