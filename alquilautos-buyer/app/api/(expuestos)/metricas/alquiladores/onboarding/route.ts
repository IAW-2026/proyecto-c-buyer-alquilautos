import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve la cantidad de alquiladores con onboarding completo vs pendiente
// Completo: nombre, apellido, fechaNacimiento, numeroDocumento, licenciaConducir y direccionFacturacion llenos

export async function GET() {
  const [total, completo] = await Promise.all([
    bd.user.count(),
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
  ]);

  return NextResponse.json({ completo, pendiente: total - completo }, { status: 200 });
}
