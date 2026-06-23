import { auth } from "@clerk/nextjs/server";
import type { Reserva } from "@/app/data/reservas";

export async function getReservaById(id: string): Promise<Reserva | null> {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? data ?? null;
  } catch {
    return null;
  }
}

export async function getReservasByAlquilador(idAlquilador: string): Promise<Reserva[]> {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/alquilador/${idAlquilador}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.reservas ?? data.reservas ?? [];
  } catch {
    return [];
  }
}
