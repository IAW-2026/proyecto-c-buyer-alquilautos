import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { nombre, apellido, fechaNacimiento, numeroDocumento, licenciaConducir, direccionFacturacion } = body;

  if (!nombre || !apellido || !fechaNacimiento || !numeroDocumento || !licenciaConducir || !direccionFacturacion) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);
  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "No se pudo obtener el email" }, { status: 400 });
  }

  const user = await bd.user.upsert({
    where: { id: userId },
    update: {
      nombre,
      apellido,
      fechaNacimiento: new Date(fechaNacimiento),
      numeroDocumento,
      licenciaConducir,
      direccionFacturacion,
    },
    create: {
      id: userId,
      email,
      nombre,
      apellido,
      fechaNacimiento: new Date(fechaNacimiento),
      numeroDocumento,
      licenciaConducir,
      direccionFacturacion,
      poolFavoritos: {
        create: {},
      },
    },
  });

  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: "alquilador",
      dbUserId: user.id,
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}