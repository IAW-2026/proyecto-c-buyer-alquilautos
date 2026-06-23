import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve el total de alquiladores registrados en la base de datos

export async function GET() {
  const total = await bd.user.count();
  return NextResponse.json({ total }, { status: 200 });
}
