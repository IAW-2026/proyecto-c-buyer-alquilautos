import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getReservasByAlquilador } from "@/app/services/reserva";
import { getVehiculoById } from "@/app/services/seller";
import ReservaCard from "@/components/reservas/reserva-card";
import ReservasPagination from "@/components/reservas/reservas-pagination";

const POR_PAGINA = 5;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ReservasPage({ searchParams }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));

  const reservas = await getReservasByAlquilador(userId);
  const totalPages = Math.ceil(reservas.length / POR_PAGINA);
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const paginadas = reservas.slice((currentPage - 1) * POR_PAGINA, currentPage * POR_PAGINA);

  const vehiculos = await Promise.all(
    paginadas.map((r) => getVehiculoById(r.id_vehiculo)),
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Mis reservas
        </h1>
        <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
          {reservas.length === 0
            ? "No tenés reservas"
            : `${reservas.length} reserva${reservas.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {reservas.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-16 text-center">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            No tenés reservas aún
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Explorá los vehículos disponibles y realizá tu primera reserva.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {paginadas.map((reserva, index) => (
              <ReservaCard
                key={reserva.id_reserva}
                reserva={reserva}
                vehiculo={vehiculos[index] ?? undefined}
              />
            ))}
          </div>
          <ReservasPagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </main>
  );
}
