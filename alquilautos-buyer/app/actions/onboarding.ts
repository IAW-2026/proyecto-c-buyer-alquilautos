"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { bd } from "@/lib/bd";

type OnboardingData = {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  numeroDocumento: string;
  licenciaConducir: string;
  direccionFacturacion: string;
};

export async function completarOnboarding(data: OnboardingData): Promise<{ success: boolean } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "No autenticado" };

  const { nombre, apellido, fechaNacimiento, numeroDocumento, licenciaConducir, direccionFacturacion } = data;

  if (!nombre || !apellido || !fechaNacimiento || !numeroDocumento || !licenciaConducir || !direccionFacturacion) {
    return { error: "Faltan campos requeridos" };
  }

  const fechaNac = new Date(fechaNacimiento);
  const hoy = new Date();
  const edadMinima = new Date(hoy.getFullYear() - 16, hoy.getMonth(), hoy.getDate());

  if (fechaNac > hoy) {
    return { error: "La fecha de nacimiento no puede ser en el futuro." };
  }

  if (fechaNac > edadMinima) {
    return { error: "Debés tener al menos 16 años para registrarte." };
  }

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);
  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) return { error: "No se pudo obtener el email" };

  const existente = await bd.user.findFirst({
    where: {
      OR: [
        { numeroDocumento },
        { licenciaConducir },
      ],
    },
  });

  if (existente) {
    if (existente.numeroDocumento === numeroDocumento) {
      return { error: "Ya existe una cuenta con ese DNI." };
    }
    if (existente.licenciaConducir === licenciaConducir) {
      return { error: "Ya existe una cuenta con esa licencia de conducir." };
    }
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
      onboardingCompleto: true,
    },
  });

  return { success: true };
}