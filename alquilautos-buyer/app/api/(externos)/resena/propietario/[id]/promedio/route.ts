import { NextResponse } from "next/server";
import { calificacionesPropietarios } from "@/app/data/feedback";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  const idPropietario = Number(id);

  // TODO: reemplazar por fetch real a la Feedback App
  // const response = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/propietario/${idPropietario}/promedio`);
  // const data = await response.json();
  // return NextResponse.json(data, { status: 200 });

  const calificacion = calificacionesPropietarios.find(
    (c) => c.id_propietario === idPropietario,
  );

  if (!calificacion) {
    return NextResponse.json(
      { id_propietario: idPropietario, calificacion_promedio: 0, cantidad_resenas: 0 },
      { status: 200 },
    );
  }

  return NextResponse.json(calificacion, { status: 200 });
}