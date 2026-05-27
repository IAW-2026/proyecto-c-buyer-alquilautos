"use client";

import { useState } from "react";

type PagoLinkModalProps = {
  idReserva: number;
  onClose: () => void;
};

export default function PagoLinkModal({ idReserva, onClose }: PagoLinkModalProps) {
  const [link, setLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLink = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pago/link?id_reserva=${idReserva}`);
      if (!res.ok) throw new Error("No se pudo obtener el link de pago");
      const data = await res.json();
      setLink(data.link);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopiar = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Fetchea el link al montar
  useState(() => {
    fetchLink();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-lg)]">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Link de pago
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Ícono */}
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-50)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--btn-primary-bg)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
          </div>

          <p className="text-center text-sm text-[var(--text-secondary)]">
            Pagá tu reserva #{idReserva} desde el siguiente link de Mercado Pago.
          </p>

          {isLoading && (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-center text-sm text-[var(--text-secondary)]">
              Obteniendo link...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
              {error}
            </div>
          )}

          {link && (
            <div className="flex items-center gap-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
              <p className="flex-1 truncate text-sm text-[var(--text-primary)]">
                {link}
              </p>
              <button
                type="button"
                onClick={handleCopiar}
                className="shrink-0 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
              >
                {copiado ? "¡Copiado!" : "Copiar"}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}