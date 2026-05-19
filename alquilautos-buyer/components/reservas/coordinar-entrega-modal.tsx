"use client";

import { useState } from "react";

type CoordinarEntregaModalProps = {
  idReserva: number;
  fechaEntrega: string;
  fechaDevolucion: string;
  horaInicio: string;
  horaFin: string;
  onClose: () => void;
};

function generarOpciones(horaInicio: string, horaFin: string): string[] {
  const opciones: string[] = [];
  const [inicioH] = horaInicio.split(":").map(Number);
  const [finH] = horaFin.split(":").map(Number);
  for (let h = inicioH; h <= finH; h++) {
    opciones.push(`${String(h).padStart(2, "0")}:00`);
  }
  return opciones;
}

function formatearFecha(fecha: string): string {
  const [año, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${año}`;
}

export default function CoordinarEntregaModal({
  idReserva,
  fechaEntrega,
  fechaDevolucion,
  horaInicio,
  horaFin,
  onClose,
}: CoordinarEntregaModalProps) {
  const opciones = generarOpciones(horaInicio, horaFin);

  const [horaEntrega, setHoraEntrega] = useState("");
  const [horaDevolucion, setHoraDevolucion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleConfirmar = async () => {
    if (!horaEntrega || !horaDevolucion) {
      setError("Seleccioná ambos horarios antes de confirmar.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/reserva/${idReserva}/coordinar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hora_entrega: horaEntrega,
          hora_devolucion: horaDevolucion,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Error al coordinar la entrega");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-lg)]">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Coordinar entrega
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--status-available-bg)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--status-available-text)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--text-primary)]">
                ¡Entrega coordinada!
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Entrega: {formatearFecha(fechaEntrega)} a las {horaEntrega}
              </p>
              <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                Devolución: {formatearFecha(fechaDevolucion)} a las {horaDevolucion}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Aviso ubicación */}
            <div className="flex items-start gap-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-400)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
              <p className="text-xs text-[var(--text-secondary)]">
                Todas las entregas se realizan en el{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  Teatro Municipal de Bahía Blanca
                </span>.
              </p>
            </div>

            {/* Horario entrega */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Horario de entrega
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {formatearFecha(fechaEntrega)} · Rango disponible: {horaInicio} – {horaFin}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {opciones.map((hora) => (
                  <button
                    key={`entrega-${hora}`}
                    type="button"
                    onClick={() => setHoraEntrega(hora)}
                    className={`h-10 rounded-xl border text-sm font-semibold transition ${
                      horaEntrega === hora
                        ? "border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                        : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>

            {/* Horario devolución */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Horario de devolución
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {formatearFecha(fechaDevolucion)} · Rango disponible: {horaInicio} – {horaFin}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {opciones.map((hora) => (
                  <button
                    key={`devolucion-${hora}`}
                    type="button"
                    onClick={() => setHoraDevolucion(hora)}
                    className={`h-10 rounded-xl border text-sm font-semibold transition ${
                      horaDevolucion === hora
                        ? "border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                        : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleConfirmar}
                disabled={isLoading}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] disabled:opacity-60"
              >
                {isLoading ? "Confirmando..." : "Confirmar horarios"}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)] disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}