import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getReservaById } from "@/app/services/reserva";
import { getVehiculoById, getPropietarioById } from "@/app/services/seller";
import ReservaResumen from "@/components/reservas/reserva-resumen";
import ReservaPropietario from "@/components/reservas/reserva-propietario";
import ReservaVehiculoInfo from "@/components/reservas/reserva-vehiculo-info";
import ReservaAcciones from "@/components/reservas/reserva-acciones";
import ResenasSection from "@/components/reservas/resenas-section";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{ id_reserva: string }>;
};

function calcularDias(inicio: string, fin: string): number {
  const diff = new Date(fin).getTime() - new Date(inicio).getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
}

export default async function ReservaDetallePage({ params }: Props) {
  const { id_reserva } = await params;

  const reserva = await getReservaById(Number(id_reserva));
  if (!reserva) notFound();

  const vehiculo = await getVehiculoById(reserva.id_vehiculo);
  const { userId } = await auth();
  const propietario = vehiculo ? await getPropietarioById(vehiculo.id_propietario) : null;

  const dias = calcularDias(reserva.fecha_inicio, reserva.fecha_final);
  const total = vehiculo ? dias * vehiculo.precio : null;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link href="/reservas" className="transition-colors hover:text-[var(--text-primary)]">
          Mis reservas
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">Reserva #{reserva.id_reserva}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          {vehiculo && (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[var(--border-default)]">
              <Image
              src={vehiculo.fotos}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, calc(100vw - 380px)"
            />
            </div>
          )}
          {vehiculo && (
            <ReservaVehiculoInfo
              marca={vehiculo.marca}
              modelo={vehiculo.modelo}
              año={vehiculo.año}
              precio={vehiculo.precio}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <ReservaResumen
            idReserva={reserva.id_reserva}
            estado={reserva.estado}
            fechaInicio={reserva.fecha_inicio}
            fechaFinal={reserva.fecha_final}
            dias={dias}
            total={total}
          />
          <ReservaAcciones
            idReserva={reserva.id_reserva}
            estado={reserva.estado}
            idVehiculo={reserva.id_vehiculo}
            idPropietario={vehiculo?.id_propietario ?? 0}
            idEmisor={userId ?? ""}
          />
          {propietario && (
            <ReservaPropietario
              nombre={propietario.nombre}
              apellido={propietario.apellido}
              email={propietario.email}
            />
          )}
        </div>
      </div>

      {reserva.estado === "Finalizada" && (
        <ResenasSection idEmisor={userId ?? ""} />
      )}
    </main>
  );
}