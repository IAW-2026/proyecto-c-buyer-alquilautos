import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

export async function PATCH(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { nombre, apellido, fechaNacimiento, numeroDocumento, licenciaConducir, direccionFacturacion } = body;

  const user = await bd.user.update({
    where: { id: userId },
    data: {
      ...(nombre !== undefined && { nombre }),
      ...(apellido !== undefined && { apellido }),
      ...(fechaNacimiento !== undefined && { fechaNacimiento: new Date(fechaNacimiento) }),
      ...(numeroDocumento !== undefined && { numeroDocumento }),
      ...(licenciaConducir !== undefined && { licenciaConducir }),
      ...(direccionFacturacion !== undefined && { direccionFacturacion }),
    },
  });

  return NextResponse.json(user, { status: 200 });
}