import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sellerData } from "@/app/data/seller";
import { reservasMock, type Reserva } from "@/app/data/reservas";
import ReservaCard from "@/components/reservas/reserva-card";

export default async function ReservasPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // TODO: reemplazar por fetch real a la Seller App
  // const response = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/alquilador/${userId}`);
  // const reservas: Reserva[] = await response.json();
  const reservas: Reserva[] = reservasMock;

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
        <div className="flex flex-col gap-4">
          {reservas.map((reserva) => {
            const vehiculo = sellerData.vehicles.find(
              (v) => v.id === reserva.id_vehiculo,
            );
            return (
              <ReservaCard
                key={reserva.id_reserva}
                reserva={reserva}
                vehiculo={vehiculo}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}