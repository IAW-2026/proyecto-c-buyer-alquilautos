import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

// Devuelve la distribución de alquiladores por rango de edad

export async function GET() {
  const users = await bd.user.findMany({ select: { fechaNacimiento: true } });

  let menores_de_25 = 0;
  let entre_25_y_40 = 0;
  let mayores_de_40 = 0;
  let sin_datos = 0;

  const ahora = new Date();

  for (const u of users) {
    if (!u.fechaNacimiento) {
      sin_datos++;
      continue;
    }

    const nacimiento = u.fechaNacimiento;
    let edad = ahora.getFullYear() - nacimiento.getFullYear();
    const cumpleEsteAño = new Date(ahora.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
    if (ahora < cumpleEsteAño) edad--;

    if (edad < 25) menores_de_25++;
    else if (edad <= 40) entre_25_y_40++;
    else mayores_de_40++;
  }

  return NextResponse.json({ menores_de_25, entre_25_y_40, mayores_de_40, sin_datos }, { status: 200 });
}
