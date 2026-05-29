import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getVehiculoById, getPropietarioById } from "@/app/services/seller";
import { getCalificacionVehiculo, getCalificacionPropietario } from "@/app/services/feedback";
import { bd } from "@/lib/bd";
import VehicleInfoPanel from "@/components/dashboard/vehiculo/vehicle-info-panel";
import OwnerCard from "@/components/dashboard/vehiculo/owner-card";
import ActionPanel from "@/components/dashboard/vehiculo/action-panel";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function VehiculoPage({ params }: Props) {
  const { id } = await params;
  const vehiculoId = Number(id);

  const vehiculo = await getVehiculoById(vehiculoId);
  if (!vehiculo) notFound();

  const propietario = await getPropietarioById(vehiculo.id_propietario);

  const calificacionVehiculo = await getCalificacionVehiculo(vehiculoId);
  const calificacionPropietario = propietario
    ? await getCalificacionPropietario(propietario.id_propietario)
    : null;

  const { userId } = await auth();

  let isFavorito = false;

  if (userId) {
    const pool = await bd.favoritePool.findUnique({
      where: { userId },
      include: {
        items: {
          where: { vehiculoExternoId: vehiculoId },
        },
      },
    });
    isFavorito = (pool?.items.length ?? 0) > 0;
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-28">
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link
          href="/dashboard"
          className="transition-colors hover:text-[var(--text-primary)]"
        >
          Explorar
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">
          {vehiculo.marca} {vehiculo.modelo}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[var(--border-default)]">
            <Image
              src={vehiculo.fotos}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, calc(100vw - 460px)"
            />
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                vehiculo.estado === "disponible"
                  ? "bg-[var(--status-available-bg)] text-[var(--status-available-text)]"
                  : "bg-[var(--status-unavailable-bg)] text-[var(--status-unavailable-text)]"
              }`}
            >
              {vehiculo.estado === "disponible"
                ? "Disponible en este momento"
                : "Indisponible en este momento"}
            </span>
          </div>

          <VehicleInfoPanel
            marca={vehiculo.marca}
            modelo={vehiculo.modelo}
            año={vehiculo.año}
            precio={vehiculo.precio}
          />
        </div>

        <div className="flex flex-col gap-4">
          <ActionPanel
            vehiculoId={vehiculo.id_vehiculo}
            propietarioId={vehiculo.id_propietario}
            marca={vehiculo.marca}
            modelo={vehiculo.modelo}
            año={vehiculo.año}
            precio={vehiculo.precio}
            estado={vehiculo.estado}
            calificacion={calificacionVehiculo?.calificacion_promedio}
            initialIsFavorito={isFavorito}
          />


          {propietario && (
            <OwnerCard
              propietarioId={propietario.id_propietario}
              nombre={propietario.nombre}
              apellido={propietario.apellido}
              email={propietario.email}
              telefono={propietario.telefono}
              calificacion={calificacionPropietario?.calificacion_promedio}
            />
          )}
        </div>
      </div>
    </main>
  );
}