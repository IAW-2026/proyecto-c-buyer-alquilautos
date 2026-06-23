import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

// Devuelve el ranking de vehículos más guardados como favorito (top 10)

async function fetchVehiculoNombres(token: string | null): Promise<Record<string, string>> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const endpoints = [
    `${process.env.SELLER_APP_URL}/api/vehiculo/disponible`,
    `${process.env.SELLER_APP_URL}/api/vehiculo`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { headers, cache: "no-store" });
      console.log(`[mas-favoriteados] fetch ${url} → ${res.status}`);
      if (!res.ok) continue;
      const data = await res.json();
      const lista: { id_vehiculo: string; marca: string; modelo: string }[] =
        data.data?.vehiculos ?? data.vehiculos ?? [];
      if (lista.length === 0) continue;
      const map: Record<string, string> = {};
      for (const v of lista) {
        map[v.id_vehiculo] = `${v.marca} ${v.modelo}`;
      }
      return map;
    } catch { continue; }
  }
  return {};
}

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

  let token: string | null = null;
  try {
    const { getToken } = await auth();
    token = await getToken();
  } catch { /* sin sesión */ }
  if (!token) {
    token = req.headers.get("authorization")?.replace("Bearer ", "") ?? null;
  }

  console.log("[mas-favoriteados] token:", token ? "presente" : "null");

  const nombresPorId = await fetchVehiculoNombres(token);

  console.log("[mas-favoriteados] nombresPorId keys:", Object.keys(nombresPorId));
  console.log("[mas-favoriteados] ids buscados:", agrupados.map((v) => v.vehiculoExternoId));

  const vehiculos = agrupados.map((v) => ({
    id_vehiculo: v.vehiculoExternoId,
    nombre: nombresPorId[v.vehiculoExternoId] ?? null,
    cantidad: v._count.vehiculoExternoId,
  }));

  return NextResponse.json({ vehiculos }, { status: 200 });
}
