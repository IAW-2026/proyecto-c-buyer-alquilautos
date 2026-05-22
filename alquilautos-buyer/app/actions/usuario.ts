"use server";

import { auth } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

type UsuarioData = {
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: string;
  numeroDocumento?: string;
  licenciaConducir?: string;
  direccionFacturacion?: string;
};

export async function actualizarUsuario(data: UsuarioData) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  const { nombre, apellido, fechaNacimiento, numeroDocumento, licenciaConducir, direccionFacturacion } = data;

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

  return user;
}