import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

// Devuelve el total de alquiladores: usuarios en Clerk que no son admins

export async function GET() {
  const clerk = await clerkClient();
  const { data } = await clerk.users.getUserList({ limit: 500 });

  const total = data.filter((u) => {
    const role = (u.publicMetadata as { role?: string })?.role;
    return role !== "adminBuyer" && role !== "adminGlobal";
  }).length;

  return NextResponse.json({ total }, { status: 200 });
}
