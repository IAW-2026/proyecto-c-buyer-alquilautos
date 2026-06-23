import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve el total de items favoritos guardados en toda la app

export async function GET() {
  const total = await bd.favoriteItem.count();
  return NextResponse.json({ total }, { status: 200 });
}
