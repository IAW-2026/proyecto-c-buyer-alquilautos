/*import { NextResponse } from "next/server";
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
}*/


import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

type RawVehiculo = {
  id_vehiculo: string;
  id_propietario: string;
  marca: string;
  modelo: string;
  año?: number;
  anio?: number;
  precio: number;
  fotos: string;
  estado: string;
};

export const runtime = "nodejs";

// Obtiene el listado de todos los vehículos disponibles consultando a la Seller App

export async function GET() {
  const { getToken } = await auth();
  const token = await getToken();

  try {
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo/disponible`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener vehículos" }, { status: res.status });
    }

    const data = await res.json();
    const raw: RawVehiculo[] = data.data?.vehiculos ?? data.vehiculos ?? data.vehicles ?? [];
    const vehiculos = raw.map((v) => ({
      ...v,
      año: v.año ?? v.anio,
      estado: v.estado?.toLowerCase() === "disponible" ? "disponible" : "indisponible",
    }));
    return NextResponse.json({ vehiculos }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener vehículos" }, { status: 500 });
  }
}