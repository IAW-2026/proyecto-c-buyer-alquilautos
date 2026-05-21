import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

type Props = {
  params: Promise<{ vehiculoExternoId: string }>;
};

export async function DELETE(_req: Request, { params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { vehiculoExternoId } = await params;
  const vehiculoId = Number(vehiculoExternoId);

  if (isNaN(vehiculoId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const pool = await bd.favoritePool.findUnique({
    where: { userId },
  });

  if (!pool) {
    return NextResponse.json({ error: "Pool no encontrado" }, { status: 404 });
  }

  await bd.favoriteItem.deleteMany({
    where: {
      poolId: pool.id,
      vehiculoExternoId: vehiculoId,
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}