"use server";

import { auth } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

export async function getFavoritos() {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  const pool = await bd.favoritePool.findUnique({
    where: { userId },
    include: { items: true },
  });

  if (!pool) throw new Error("Pool no encontrado");

  return pool.items;
}

export async function addFavorito(vehiculoExternoId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  if (!vehiculoExternoId || typeof vehiculoExternoId !== "number") {
    throw new Error("vehiculoExternoId requerido");
  }

  const pool = await bd.favoritePool.findUnique({
    where: { userId },
  });

  if (!pool) throw new Error("Pool no encontrado");

  const item = await bd.favoriteItem.create({
    data: {
      vehiculoExternoId,
      poolId: pool.id,
    },
  });

  return item;
}

export async function deleteFavorito(vehiculoExternoId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  if (isNaN(vehiculoExternoId)) throw new Error("ID inválido");

  const pool = await bd.favoritePool.findUnique({
    where: { userId },
  });

  if (!pool) throw new Error("Pool no encontrado");

  await bd.favoriteItem.deleteMany({
    where: {
      poolId: pool.id,
      vehiculoExternoId,
    },
  });

  return { success: true };
}