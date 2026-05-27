import { NextResponse } from "next/server";
import { resumenPropietario } from "@/app/data/feedback";

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  // TODO: const res = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resumen/propietario/${id}`);
  // return NextResponse.json(await res.json());
  return NextResponse.json({ ...resumenPropietario, id_propietario: Number(id) });
}