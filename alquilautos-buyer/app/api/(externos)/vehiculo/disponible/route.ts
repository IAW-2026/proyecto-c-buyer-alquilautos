import { NextResponse } from "next/server";
import { sellerData } from "@/app/data/seller";

export const runtime = "nodejs";

// Obtiene el listado de todos los vehículos disponibles e indisponibles consultando a la Seller App 

export async function GET() {
  // TODO: reemplazar por fetch real a la Seller App
  // const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo/disponible`);
  // return NextResponse.json(await res.json());
  return NextResponse.json(
    { vehiculos: sellerData.vehicles },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}