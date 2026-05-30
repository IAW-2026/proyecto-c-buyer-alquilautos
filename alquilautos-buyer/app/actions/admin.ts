"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";
import { Prisma } from "@prisma/client";

type UsuarioAdminData = {
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: string;
  numeroDocumento?: string;
  licenciaConducir?: string;
  direccionFacturacion?: string;
};

async function verificarAdmin() {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.publicMetadata as { role?: string })?.role;
  if (role !== "adminBuyer") throw new Error("No autorizado");
}

export async function actualizarUsuarioAdmin(userId: string, data: UsuarioAdminData): Promise<{ success: boolean } | { error: string }> {
  await verificarAdmin();

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
    return { error: "Ya existe una cuenta con esos datos." };
  }
  return { error: "Error inesperado al guardar los datos." };
}
}

export async function eliminarUsuarioAdmin(userId: string) {
  await verificarAdmin();

  const clerk = await clerkClient();
  await clerk.users.deleteUser(userId);
  await bd.user.delete({ where: { id: userId } });
}

export async function getUsuarios() {
  await verificarAdmin();

  const usuarios = await bd.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  const clerk = await clerkClient();

  const usuariosConRol = await Promise.all(
    usuarios.map(async (u) => {
      try {
        const clerkUser = await clerk.users.getUser(u.id);
        const role = (clerkUser.publicMetadata as { role?: string })?.role ?? null;
        return { ...u, role };
      } catch {
        return { ...u, role: null };
      }
    }),
  );

  return usuariosConRol;
}