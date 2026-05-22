"use client";

import { useState } from "react";
import StarRating from "@/components/dashboard/vehiculo/star-rating";
import ReservaModal from "@/components/dashboard/vehiculo/reserva-modal";

type ActionPanelProps = {
  vehiculoId: number;
  propietarioId: number;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
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
  calificacion,
  initialIsFavorito,
}: ActionPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorito, setIsFavorito] = useState(initialIsFavorito);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleFavorito = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isFavorito) {
        const response = await fetch(`/api/favoritos/${vehiculoId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error ?? "Error al eliminar de favoritos");
        }
        setIsFavorito(false);
      } else {
        const response = await fetch("/api/favorito", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vehiculoExternoId: vehiculoId }),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error ?? "Error al agregar a favoritos");
        }
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

        <div className="mt-5 flex items-end gap-2">
          <span className="text-3xl font-bold text-[var(--text-primary)]">
            ${precio.toLocaleString("es-AR")}
          </span>
          <span className="mb-1 text-sm text-[var(--text-secondary)]">/ día</span>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
            {error}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)]"
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
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 text-[var(--color-star)]"
              fill="currentColor"
            >
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