"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CancelarReservaModalProps = {
  idReserva: number;
  onClose: () => void;
};

export default function CancelarReservaModal({
  idReserva,
  onClose,
}: CancelarReservaModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelar = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/reserva/${idReserva}/cancelar`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Error al cancelar la reserva");
      }

      router.push("/reservas");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-lg)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--status-unavailable-bg)]">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--status-unavailable-text)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              ¿Cancelar reserva #{idReserva}?
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Esta acción es <span className="font-semibold text-[var(--status-unavailable-text)]">irreversible</span>. Una vez cancelada, deberás realizar la reserva nuevamente si cambiás de opinión.
            </p>
          </div>

          {error && (
            <div className="w-full rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
              {error}
            </div>
          )}

          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleCancelar}
              disabled={isLoading}
              className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] text-sm font-semibold text-[var(--status-unavailable-text)] transition hover:opacity-80 disabled:opacity-60"
            >
              {isLoading ? "Cancelando..." : "Sí, cancelar reserva"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)] disabled:opacity-60"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}