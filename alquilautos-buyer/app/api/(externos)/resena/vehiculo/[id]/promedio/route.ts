import { NextResponse } from "next/server";
import { calificacionesVehiculos } from "@/app/data/feedback";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  const idVehiculo = Number(id);

  // TODO: reemplazar por fetch real a la Feedback App
  // const response = await fetch(`${process.env.FEEDBACK_APP_URL}/api/resena/vehiculo/${idVehiculo}/promedio`);
  // const data = await response.json();
  // return NextResponse.json(data, { status: 200 });

  const calificacion = calificacionesVehiculos.find(
    (c) => c.id_vehiculo === idVehiculo,
  );

  if (!calificacion) {
    return NextResponse.json(
      { id_vehiculo: idVehiculo, calificacion_promedio: 0, cantidad_resenas: 0 },
      { status: 200 },
    );
  }

  return NextResponse.json(calificacion, { status: 200 });
}