"use client";

import Image from "next/image";
import Link from "next/link";
import type { SellerVehicle, SellerOwner } from "@/app/data/seller";

type FavoriteCardProps = {
  vehicle: SellerVehicle;
  owner: SellerOwner | undefined;
  calificacion?: number;
  onDelete: (vehiculoExternoId: number) => void;
  isDeleting: boolean;
};

export default function FavoriteCard({
  vehicle,
  owner,
  calificacion,
  onDelete,
  isDeleting,
}: FavoriteCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 sm:flex-row sm:items-center sm:gap-6">
      {/* Imagen */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:h-32 sm:w-48 sm:shrink-0">
        <Image
          src={vehicle.imagen}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 192px"
        />
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
            vehicle.estado === "disponible"
              ? "bg-[var(--status-available-bg)] text-[var(--status-available-text)]"
              : "bg-[var(--status-unavailable-bg)] text-[var(--status-unavailable-text)]"
          }`}
        >
          {vehicle.estado === "disponible" ? "Disponible" : "Indisponible"}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {vehicle.marca} {vehicle.modelo}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {vehicle.año}{calificacion !== undefined ? ` · ${calificacion.toFixed(1)}★` : ""}
            </p>
            {owner && (
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Propietario:{" "}
                <span className="font-medium text-[var(--text-primary)]">
                  {owner.nombre} {owner.apellido}
                </span>
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-[var(--text-primary)]">
              ${vehicle.precio.toLocaleString("es-AR")}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">/ día</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/dashboard/vehiculo/${vehicle.id}`}
            className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] sm:w-auto sm:px-6"
          >
            Ver detalle
          </Link>
          <button
            type="button"
            onClick={() => onDelete(vehicle.id)}
            disabled={isDeleting}
            className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-[var(--status-unavailable-border)] bg-transparent text-sm font-semibold text-[var(--status-unavailable-text)] transition hover:bg-[var(--status-unavailable-bg)] disabled:opacity-50 sm:w-auto sm:px-6"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </article>
  );
}