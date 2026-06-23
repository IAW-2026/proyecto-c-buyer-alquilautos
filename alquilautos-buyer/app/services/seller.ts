import { auth } from "@clerk/nextjs/server";
import type { SellerVehicle, SellerOwner } from "@/app/data/seller";

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

function normalizeVehiculo(v: RawVehiculo): SellerVehicle {
  return {
    ...v,
    año: v.año ?? v.anio ?? 0,
    estado: v.estado?.toLowerCase() === "disponible" ? "disponible" : "indisponible",
  };
}

export async function getPropietarioById(id: string): Promise<SellerOwner | null> {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? data;
  } catch {
    return null;
  }
}

export async function getVehiculoById(id: string): Promise<SellerVehicle | null> {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo/disponible`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw: RawVehiculo[] = data.data?.vehiculos ?? data.vehiculos ?? [];
    return raw.map(normalizeVehiculo).find((v) => v.id_vehiculo === id) ?? null;
  } catch {
    return null;
  }
}

export async function getVehiculosByPropietario(idPropietario: string): Promise<SellerVehicle[]> {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario/${idPropietario}/vehiculo`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const raw: RawVehiculo[] = data.data?.vehiculos ?? data.vehiculos ?? [];
    return raw.map(normalizeVehiculo);
  } catch {
    return [];
  }
}
