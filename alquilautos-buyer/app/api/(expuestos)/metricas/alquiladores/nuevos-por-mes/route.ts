import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve la cantidad de alquiladores nuevos agrupados por mes

export async function GET() {
  const users = await bd.user.findMany({ select: { createdAt: true } });

  const conteo: Record<string, number> = {};
  for (const u of users) {
    const año = u.createdAt.getFullYear();
    const mes = String(u.createdAt.getMonth() + 1).padStart(2, "0");
    const clave = `${año}-${mes}`;
    conteo[clave] = (conteo[clave] ?? 0) + 1;
  }

  const meses = Object.entries(conteo)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, total]) => ({ mes, total }));

  return NextResponse.json({ meses }, { status: 200 });
}
