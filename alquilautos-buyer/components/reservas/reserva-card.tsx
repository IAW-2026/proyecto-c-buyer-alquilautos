import Link from "next/link";
import Image from "next/image";
import type { Reserva } from "@/app/data/reservas";
import type { SellerVehicle } from "@/app/data/seller";

type ReservaCardProps = {
  reserva: Reserva;
  vehiculo: SellerVehicle | undefined;
};

const estadoStyles = {
  Pendiente: "bg-[var(--color-accent-100)] text-[var(--color-accent-700)]",
  Confirmada: "bg-[var(--status-available-bg)] text-[var(--status-available-text)]",
  Rechazada: "bg-[var(--status-unavailable-bg)] text-[var(--status-unavailable-text)]",
};

function formatearFecha(fecha: string): string {
  const [año, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${año}`;
}

export default function ReservaCard({ reserva, vehiculo }: ReservaCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 sm:flex-row sm:items-center sm:gap-6">
      {/* Imagen */}
      {vehiculo && (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:h-32 sm:w-48 sm:shrink-0">
          <Image
            src={vehiculo.imagen}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : `Vehículo #${reserva.id_vehiculo}`}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {formatearFecha(reserva.fecha_inicio)} → {formatearFecha(reserva.fecha_final)}
            </p>
            <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
              Reserva #{reserva.id_reserva}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${estadoStyles[reserva.estado]}`}>
            {reserva.estado}
          </span>
        </div>

        <Link
          href={`/reservas/${reserva.id_reserva}`}
          className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] sm:w-auto sm:px-6"
        >
          Ver reserva
        </Link>
      </div>
    </article>
  );
}