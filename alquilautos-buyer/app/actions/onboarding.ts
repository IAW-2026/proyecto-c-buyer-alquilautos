"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { bd } from "@/lib/bd";

type OnboardingData = {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  numeroDocumento: string;
  licenciaConducir: string;
  direccionFacturacion: string;
};

export async function completarOnboarding(data: OnboardingData) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  const { nombre, apellido, fechaNacimiento, numeroDocumento, licenciaConducir, direccionFacturacion } = data;

  if (!nombre || !apellido || !fechaNacimiento || !numeroDocumento || !licenciaConducir || !direccionFacturacion) {
    throw new Error("Faltan campos requeridos");
  }

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);
  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) throw new Error("No se pudo obtener el email");

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