import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

// completo: usuarios en BD con todos los campos llenos
// pendiente: usuarios en Clerk (no-admin) que no tienen registro en la BD

export async function GET() {
  const clerk = await clerkClient();
  const { data } = await clerk.users.getUserList({ limit: 500 });

  const noAdmins = data.filter((u) => {
    const role = (u.publicMetadata as { role?: string })?.role;
    return role !== "adminBuyer" && role !== "adminGlobal";
  });

  const idsEnClerk = new Set(noAdmins.map((u) => u.id));

  const [completo, idsEnBD] = await Promise.all([
    bd.user.count({
      where: {
        nombre: { not: null },
        apellido: { not: null },
        fechaNacimiento: { not: null },
        numeroDocumento: { not: null },
        licenciaConducir: { not: null },
        direccionFacturacion: { not: null },
      },
    }),
    bd.user.findMany({ select: { id: true } }),
  ]);

  const idsEnBDSet = new Set(idsEnBD.map((u) => u.id));
  const pendiente = [...idsEnClerk].filter((id) => !idsEnBDSet.has(id)).length;

  return NextResponse.json({ completo, pendiente }, { status: 200 });
}
