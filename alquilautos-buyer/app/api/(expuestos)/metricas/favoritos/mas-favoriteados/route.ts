import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve el ranking de vehículos más guardados como favorito (top 10)

export async function GET() {
  const agrupados = await bd.favoriteItem.groupBy({
    by: ["vehiculoExternoId"],
    _count: { vehiculoExternoId: true },
    orderBy: { _count: { vehiculoExternoId: "desc" } },
    take: 10,
  });

  const vehiculos = agrupados.map((v) => ({
    id_vehiculo: v.vehiculoExternoId,
    cantidad: v._count.vehiculoExternoId,
  }));

  return NextResponse.json({ vehiculos }, { status: 200 });
}
