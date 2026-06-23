import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve el promedio de favoritos por usuario que tiene al menos uno

export async function GET() {
  const pools = await bd.favoritePool.findMany({
    where: { items: { some: {} } },
    include: { _count: { select: { items: true } } },
  });

  if (pools.length === 0) {
    return NextResponse.json({ promedio: 0, usuarios_con_favoritos: 0 }, { status: 200 });
  }

  const totalItems = pools.reduce((acc, p) => acc + p._count.items, 0);
  const promedio = Math.round((totalItems / pools.length) * 100) / 100;

  return NextResponse.json({ promedio, usuarios_con_favoritos: pools.length }, { status: 200 });
}
