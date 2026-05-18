import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const pool = await bd.favoritePool.findUnique({
    where: { userId },
    include: { items: true },
  });

  if (!pool) {
    return NextResponse.json({ error: "Pool no encontrado" }, { status: 404 });
  }

  return NextResponse.json(pool.items, { status: 200 });
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { vehiculoExternoId } = body;

  if (!vehiculoExternoId || typeof vehiculoExternoId !== "number") {
    return NextResponse.json({ error: "vehiculoExternoId requerido" }, { status: 400 });
  }

  const pool = await bd.favoritePool.findUnique({
    where: { userId },
  });

  if (!pool) {
    return NextResponse.json({ error: "Pool no encontrado" }, { status: 404 });
  }

  const item = await bd.favoriteItem.create({
    data: {
      vehiculoExternoId,
      poolId: pool.id,
    },
  });

  return NextResponse.json(item, { status: 201 });
}