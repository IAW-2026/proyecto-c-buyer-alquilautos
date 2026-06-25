import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPropietarioById, getVehiculosByPropietario } from "@/app/services/seller";
import { getCalificacionPropietario } from "@/app/services/feedback";
import VehicleCard from "@/components/shared/vehicle-card-section";
import StarRating from "@/components/dashboard/vehiculo/star-rating";
import ResenasPropietario from "@/components/dashboard/propietario/resenas-propietario";
import ResumenPropietario from "@/components/dashboard/propietario/resumen-propietario";
import ReservasPagination from "@/components/reservas/reservas-pagination";

const POR_PAGINA = 6;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function PropietarioPage({ params, searchParams }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;
  const { page } = await searchParams;
  const paginaActual = Math.max(1, Number(page ?? "1"));

  const [propietario, vehiculos, calificacion] = await Promise.all([
    getPropietarioById(id),
    getVehiculosByPropietario(id),
    getCalificacionPropietario(id),
  ]);

  if (!propietario) notFound();

  const totalPaginas = Math.ceil(vehiculos.length / POR_PAGINA);
  const vehiculosPagina = vehiculos.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-28">
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Link href="/dashboard" className="transition-colors hover:text-[var(--text-primary)]">
          Explorar
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">
          {propietario.nombre} {propietario.apellido}
        </span>
      </nav>

      {/* Header card: info + resumen IA al costado */}
      <div className="mb-8 flex flex-col gap-6 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 lg:flex-row lg:items-start">
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-xl font-bold text-white">
            {propietario.nombre.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              {propietario.nombre} {propietario.apellido}
            </h1>
            {calificacion && (
              <StarRating
                rating={calificacion.calificacion_promedio}
                valueClassName="text-sm text-[var(--text-secondary)]"
              />
            )}
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{propietario.email}</p>
          </div>
        </div>

        <div className="lg:border-l lg:border-[var(--border-default)] lg:pl-6 lg:flex-1">
          <ResumenPropietario propietarioId={id} />
        </div>
      </div>

      {/* Vehículos */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Vehículos publicados
        </h2>
        <span className="text-sm text-[var(--text-secondary)]">
          {vehiculos.length} vehículo{vehiculos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {vehiculos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-16 text-center">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            Sin vehículos publicados
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Este propietario aún no tiene vehículos disponibles.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehiculosPagina.map((v) => (
              <VehicleCard
                key={v.id_vehiculo}
                vehicle={v}
                actionLabel="Ver vehículo"
                actionHref={`/dashboard/vehiculo/${v.id_vehiculo}`}
              />
            ))}
          </div>
          <ReservasPagination currentPage={paginaActual} totalPages={totalPaginas} />
        </>
      )}

      <ResenasPropietario propietarioId={id} />
    </main>
  );
}
