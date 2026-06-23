import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

type Props = { params: Promise<{ id: string }> };

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

// Obtiene todos los vehículos publicados por un propietario consultando a la Seller App

export async function GET(_req: Request, { params }: Props) {
  const { userId, getToken } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = await getToken();
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario/${id}/vehiculo`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener vehículos" }, { status: res.status });
    }

    const data = await res.json();
    const raw: RawVehiculo[] = data.data?.vehiculos ?? data.vehiculos ?? [];
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
