import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";


//  Devuelve todos los alquiladores registrados en la base de datos en un array con sus datos personales y calificación.

export async function GET() {
  const users = await bd.user.findMany({
    include: {
      poolFavoritos: true,
    },
  });

  return NextResponse.json(
    {
      alquiladores: users.map((user) => ({
        id_alquilador: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        fecha_nacimiento: user.fechaNacimiento,
        dni: user.numeroDocumento,
        licencia_conducir: user.licenciaConducir,
        direccion: user.direccionFacturacion,
        id_lista: user.poolFavoritos?.id ?? null,
        calificacion: user.calificacion,
      })),
    },
    { status: 200 },
  );
}