"use client";

import { useState } from "react";

type ReservaModalProps = {
  vehiculoId: number;
  propietarioId: number;
  marca: string;
  modelo: string;
  precio: number;
  onClose: () => void;
};

type Step = "fechas" | "confirmacion" | "exito";

const hoy = new Date().toISOString().split("T")[0];

function calcularDias(inicio: string, fin: string): number {
  if (!inicio || !fin) return 0;
  const diff = new Date(fin).getTime() - new Date(inicio).getTime();
  return diff === 0 ? 1 : Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function calcularMaxFin(inicio: string): string {
  if (!inicio) return "";
  const fecha = new Date(inicio);
  fecha.setFullYear(fecha.getFullYear() + 1);
  return fecha.toISOString().split("T")[0];
}

function formatearFecha(fecha: string): string {
  if (!fecha) return "";
  const [año, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${año}`;
}

export default function ReservaModal({
  vehiculoId,
  propietarioId,
  marca,
  modelo,
  precio,
  onClose,
}: ReservaModalProps) {
  const [step, setStep] = useState<Step>("fechas");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idReserva, setIdReserva] = useState<number | null>(null);

  const dias = calcularDias(fechaInicio, fechaFin);
  const total = dias > 0 ? dias * precio : 0;
  const maxFin = calcularMaxFin(fechaInicio);

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor.split("-")[0].length > 4) return;
    setFechaInicio(valor);
    setFechaFin("");
    setError(null);
  };

  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor.split("-")[0].length > 4) return;
    setFechaFin(valor);
    setError(null);
  };

  const handleSiguiente = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmacion");
  };

  const handleConfirmar = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_vehiculo: vehiculoId,
          id_propietario: propietarioId,
          fecha_inicio: fechaInicio,
          fecha_final: fechaFin,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Error al crear la reserva");
      }

      const data = await response.json();
      setIdReserva(data.id_reserva);
      setStep("exito");
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
          <div className="flex items-center gap-3">
            {step === "confirmacion" && (
              <button
                type="button"
                onClick={() => setStep("fechas")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
              >
                ←
              </button>
            )}
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {step === "fechas" && "Seleccioná las fechas"}
              {step === "confirmacion" && "Confirmá tu reserva"}
              {step === "exito" && "¡Reserva creada!"}
            </h2>
          </div>
          {step !== "exito" && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Step: fechas */}
        {step === "fechas" && (
          <form onSubmit={handleSiguiente} className="flex flex-col gap-5">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {marca} {modelo}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                ${precio.toLocaleString("es-AR")} / día
              </p>
              {dias > 0 && (
                <div className="mt-3 flex items-center justify-between border-t border-[var(--border-default)] pt-3">
                  <span className="text-sm text-[var(--text-secondary)]">
                    {dias} día{dias !== 1 ? "s" : ""} × ${precio.toLocaleString("es-AR")}
                  </span>
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>
          )}
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text-primary)]">
              Fecha de inicio
              <input
                type="date"
                required
                min={hoy}
                value={fechaInicio}
                onChange={handleFechaInicioChange}
                className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-primary-100)]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text-primary)]">
              Fecha de fin
              <input
                type="date"
                required
                min={fechaInicio || hoy}
                max={maxFin}
                value={fechaFin}
                onChange={handleFechaFinChange}
                disabled={!fechaInicio}
                className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-primary-100)] disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>

            {error && (
              <div className="rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                disabled={!fechaInicio || !fechaFin}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] disabled:opacity-60"
              >
                Siguiente
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Step: confirmacion */}
        {step === "confirmacion" && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {marca} {modelo}
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Fecha de inicio</span>
                <span className="font-medium text-[var(--text-primary)]">{formatearFecha(fechaInicio)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Fecha de fin</span>
                <span className="font-medium text-[var(--text-primary)]">{formatearFecha(fechaFin)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Duración</span>
                <span className="font-medium text-[var(--text-primary)]">{dias} día{dias !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--border-default)] pt-3 text-sm">
                <span className="font-semibold text-[var(--text-primary)]">Total estimado</span>
                <span className="text-lg font-bold text-[var(--text-primary)]">${total.toLocaleString("es-AR")}</span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] text-center">
              ¿Estás seguro que querés solicitar esta reserva?
            </p>

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
                {isLoading ? "Confirmando..." : "Confirmar solicitud"}
              </button>
              <button
                type="button"
                onClick={() => setStep("fechas")}
                disabled={isLoading}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)] disabled:opacity-60"
              >
                Volver
              </button>
            </div>
          </div>
        )}

        {/* Step: exito */}
        {step === "exito" && (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--status-available-bg)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--status-available-text)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--text-primary)]">
                ¡Reserva solicitada exitosamente!
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                ID de reserva: <span className="font-semibold">{idReserva}</span>
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
        )}
      </div>
    </div>
  );
}