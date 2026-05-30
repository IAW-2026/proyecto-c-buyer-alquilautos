"use server";

import { auth } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";
import { Prisma } from "@prisma/client";

type UsuarioData = {
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: string;
  numeroDocumento?: string;
  licenciaConducir?: string;
  direccionFacturacion?: string;
};

export async function actualizarUsuario(data: UsuarioData): Promise<{ success: boolean } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "No autenticado" };

  const { nombre, apellido, fechaNacimiento, numeroDocumento, licenciaConducir, direccionFacturacion } = data;

  try {
    await bd.user.update({
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

    return { success: true };
  } catch (err) {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    const target = err.meta?.target;
    const campo = Array.isArray(target) ? target[0] : String(target ?? "");
    
    if (campo.includes("numeroDocumento") || campo.includes("User_numeroDocumento")) {
      return { error: "Ya existe una cuenta con ese DNI." };
    }
    if (campo.includes("licenciaConducir") || campo.includes("User_licenciaConducir")) {
      return { error: "Ya existe una cuenta con esa licencia de conducir." };
    }
    return { error: "Ya existe una cuenta con esos datos." };
  }
  return { error: "Error inesperado al guardar los datos." };
}
}