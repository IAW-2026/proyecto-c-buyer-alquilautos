"use client";

import { useState, useEffect } from "react";
import StarRating from "@/components/dashboard/vehiculo/star-rating";
import ReservaModal from "@/components/dashboard/vehiculo/reserva-modal";
import { addFavorito, deleteFavorito } from "@/app/actions/favorito";

type ResumenVehiculo = {
  resumen: string;
};

type ActionPanelProps = {
  vehiculoId: number;
  propietarioId: number;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  estado: "disponible" | "indisponible";
  calificacion?: number;
  initialIsFavorito: boolean;
};

export default function ActionPanel({
  vehiculoId,
  propietarioId,
  marca,
  modelo,
  año,
  precio,
  estado,
  calificacion,
  initialIsFavorito,
}: ActionPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorito, setIsFavorito] = useState(initialIsFavorito);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [resumen, setResumen] = useState<ResumenVehiculo | null>(null);

  useEffect(() => {
    fetch(`/api/resumen/vehiculo/${vehiculoId}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setResumen(data))
      .catch(() => null);
  }, [vehiculoId]);

  const handleToggleFavorito = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isFavorito) {
        await deleteFavorito(vehiculoId);
        setIsFavorito(false);
      } else {
        await addFavorito(vehiculoId);
        setIsFavorito(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          {marca} {modelo}
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{año}</p>

        {calificacion !== undefined && (
          <div className="mt-3">
            <StarRating rating={calificacion} />
          </div>
        )}

        {resumen && (
          <div className="mt-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
            <p className="text-xs italic text-[var(--text-secondary)]">{resumen.resumen}</p>
          </div>
        )}

        <div className="mt-5 flex items-end gap-2">
          <span className="text-3xl font-bold text-[var(--text-primary)]">
            ${precio.toLocaleString("es-AR")}
          </span>
          <span className="mb-1 text-sm text-[var(--text-secondary)]">/ día</span>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => estado === "disponible" && setShowModal(true)}
            disabled={estado === "indisponible"}
            className={`inline-flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold transition ${
              estado === "disponible"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-bg-hover)]"
                : "cursor-not-allowed bg-[var(--color-neutral-200)] text-[var(--text-disabled)]"
            }`}
          >
            Reservar ahora
          </button>
          <button
            type="button"
            onClick={handleToggleFavorito}
            disabled={isLoading}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition disabled:opacity-60 ${
              isFavorito
                ? "border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] text-[var(--status-unavailable-text)] hover:opacity-80"
                : "border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
            }`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[var(--color-star)]" fill="currentColor">
              <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
            </svg>
            {isLoading
              ? isFavorito ? "Eliminando..." : "Agregando..."
              : isFavorito ? "Eliminar de favoritos" : "Agregar a favoritos"}
          </button>
        </div>
      </div>

      {showModal && (
        <ReservaModal
          vehiculoId={vehiculoId}
          propietarioId={propietarioId}
          marca={marca}
          modelo={modelo}
          precio={precio}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}