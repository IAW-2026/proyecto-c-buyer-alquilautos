import { NextResponse } from "next/server";
import { resenasPropietarios } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/propietario/${id}`);
  // return NextResponse.json(await res.json());
  const resenas = resenasPropietarios.filter((r) => r.id_reserva === Number(id));
  return NextResponse.json({ resenas });
}