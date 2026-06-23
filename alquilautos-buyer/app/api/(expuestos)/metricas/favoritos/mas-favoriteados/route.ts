import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

// Devuelve el ranking de vehículos más guardados como favorito (top 10)

export async function GET(req: NextRequest) {
  const agrupados = await bd.favoriteItem.groupBy({
    by: ["vehiculoExternoId"],
    _count: { vehiculoExternoId: true },
    orderBy: { _count: { vehiculoExternoId: "desc" } },
    take: 10,
  });

  if (agrupados.length === 0) {
    return NextResponse.json({ vehiculos: [] }, { status: 200 });
  }

  // Intentar enriquecer con nombre del vehículo desde Seller App
  let nombresPorId: Record<string, string> = {};
  try {
    const { getToken } = await auth();
    const token = (await getToken()) ?? req.headers.get("authorization")?.replace("Bearer ", "");

    if (token) {
      const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo/disponible`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const lista: { id_vehiculo: string; marca: string; modelo: string }[] =
          data.data?.vehiculos ?? data.vehiculos ?? [];
        for (const v of lista) {
          nombresPorId[v.id_vehiculo] = `${v.marca} ${v.modelo}`;
        }
      }
    }
  } catch { /* sin nombres, igual se devuelve el ranking */ }

  const vehiculos = agrupados.map((v) => ({
    id_vehiculo: v.vehiculoExternoId,
    nombre: nombresPorId[v.vehiculoExternoId] ?? null,
    cantidad: v._count.vehiculoExternoId,
  }));

  return NextResponse.json({ vehiculos }, { status: 200 });
}
