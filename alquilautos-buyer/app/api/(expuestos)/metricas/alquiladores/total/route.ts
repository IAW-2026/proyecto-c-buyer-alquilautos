import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

// total = usuarios en BD (completo) + usuarios en Clerk con rol "alquilador"/"adminBuyer" no en BD (pendiente)

export async function GET() {
  const [bdCount, bdUsers] = await Promise.all([
    bd.user.count(),
    bd.user.findMany({ select: { id: true } }),
  ]);

  const clerk = await clerkClient();
  const { data } = await clerk.users.getUserList({ limit: 500 });

  const bdIds = new Set(bdUsers.map((u) => u.id));

  const pendiente = data.filter((u) => {
    const role = (u.publicMetadata as { role?: string })?.role;
    return (role === "alquilador" || role === "adminBuyer") && !bdIds.has(u.id);
  }).length;

  return NextResponse.json({ total: bdCount + pendiente }, { status: 200 });
}
