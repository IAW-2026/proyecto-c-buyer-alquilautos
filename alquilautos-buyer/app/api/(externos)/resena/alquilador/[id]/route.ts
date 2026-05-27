import { NextResponse } from "next/server";
import { resenasAlquiladores } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/alquilador/${id}`);
  // return NextResponse.json(await res.json());
  const resenas = resenasAlquiladores.filter((r) => r.id_reserva === Number(id));
  return NextResponse.json({ resenas });
}