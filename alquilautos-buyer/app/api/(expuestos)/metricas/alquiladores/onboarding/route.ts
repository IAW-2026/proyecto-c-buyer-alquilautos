import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

// completo: todos los usuarios en la BD (completaron onboarding, con o sin cuenta Clerk)
// pendiente: usuarios en Clerk con rol "alquilador" o "adminBuyer" que NO están en la BD

export async function GET() {
  const [completo, bdUsers] = await Promise.all([
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

  return NextResponse.json({ completo, pendiente }, { status: 200 });
}
