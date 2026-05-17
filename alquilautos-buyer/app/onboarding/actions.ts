"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { bd } from "@/lib/bd";

type OnboardingPayload = {
  fechaNacimiento: string;
  numeroDocumento: string;
  licenciaConducir: string;
  direccionFacturacion: string;
};

export async function completeOnboarding(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const payload: OnboardingPayload = {
    fechaNacimiento: formData.get("fechaNacimiento")?.toString() ?? "",
    numeroDocumento: formData.get("numeroDocumento")?.toString() ?? "",
    licenciaConducir: formData.get("licenciaConducir")?.toString() ?? "",
    direccionFacturacion: formData
      .get("direccionFacturacion")
      ?.toString() ?? "",
  };

  if (
    !payload.fechaNacimiento ||
    !payload.numeroDocumento ||
    !payload.licenciaConducir ||
    !payload.direccionFacturacion
  ) {
    throw new Error("Missing required fields");
  }

  await bd.user.update({
    where: { id: userId },
    data: {
      fechaNacimiento: new Date(payload.fechaNacimiento),
      numeroDocumento: payload.numeroDocumento,
      licenciaConducir: payload.licenciaConducir,
      direccionFacturacion: payload.direccionFacturacion,
    },
  });

  redirect("/");
}
