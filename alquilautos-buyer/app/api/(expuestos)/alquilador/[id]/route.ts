import { NextResponse } from "next/server";
import { bd } from "@/lib/bd";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;

  const user = await bd.user.findUnique({
    where: { id },
    include: {
      poolFavoritos: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Alquilador no encontrado" }, { status: 404 });
  }

  return NextResponse.json(
    {
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
    },
    { status: 200 },
  );
}