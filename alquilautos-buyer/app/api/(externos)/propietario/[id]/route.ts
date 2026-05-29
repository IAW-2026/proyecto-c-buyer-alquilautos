import { NextResponse } from "next/server";
import { sellerData } from "@/app/data/seller";

export const runtime = "nodejs";

type Props = {
  params: Promise<{ id: string }>;
};

//Obtiene los datos completos de un propietario por su ID consultando a la Seller App

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  const propietarioId = Number(id);

  // TODO: reemplazar por fetch real a la Seller App
  // const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario/${propietarioId}`);
  // return NextResponse.json(await res.json());

  const propietario = sellerData.owners.find((o) => o.id_propietario === propietarioId);
  if (!propietario) {
    return NextResponse.json({ error: "Propietario no encontrado" }, { status: 404 });
  }

  return NextResponse.json(propietario, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}