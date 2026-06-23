import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve cuántos usuarios tienen al menos un favorito vs cuántos no tienen ninguno

export async function GET() {
  const [totalUsuarios, usuariosConFavoritos] = await Promise.all([
    bd.user.count(),
    bd.favoritePool.count({
      where: { items: { some: {} } },
    }),
  ]);

  return NextResponse.json(
    { con_favoritos: usuariosConFavoritos, sin_favoritos: totalUsuarios - usuariosConFavoritos },
    { status: 200 }
  );
}
