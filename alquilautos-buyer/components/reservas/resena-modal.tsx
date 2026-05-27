"use client";

import { useState } from "react";

type Tab = "vehiculo" | "propietario";

type ResenaModalProps = {
  idReserva: number;
  idVehiculo: number;
  idPropietario: number;
  idEmisor: string;
  onClose: () => void;
};

function StarSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-6 w-6 transition-colors ${
                star <= (hovered || value)
                  ? "text-[var(--color-star)]"
                  : "text-[var(--border-strong)]"
              }`}
              fill={star <= (hovered || value) ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ResenaModal({
  idReserva,
  idVehiculo,
  idPropietario,
  idEmisor,
  onClose,
}: ResenaModalProps) {
  const [tab, setTab] = useState<Tab>("vehiculo");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Campos comunes
  const [calificacionGeneral, setCalificacionGeneral] = useState(3);
  const [descripcion, setDescripcion] = useState("");

  // Campos vehículo
  const [calificacionLimpieza, setCalificacionLimpieza] = useState(3);
  const [calificacionEstado, setCalificacionEstado] = useState(3);
  const [calificacionComodidad, setCalificacionComodidad] = useState(3);

  // Campos propietario
  const [calificacionComunicacion, setCalificacionComunicacion] = useState(3);
  const [calificacionPuntualidad, setCalificacionPuntualidad] = useState(3);

  const handleEnviar = async () => {
    if (!descripcion.trim()) {
      setError("Escribí una descripción antes de enviar.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const body =
      tab === "vehiculo"
        ? {
            idReserva,
            idEmisor,
            calificacionGeneral,
            descripcion,
            idVehiculo,
            calificacionLimpieza,
            calificacionEstado,
            calificacionComodidad,
          }
        : {
            idReserva,
            idEmisor,
            calificacionGeneral,
            descripcion,
            idPropietario,
            calificacionComunicacion,
            calificacionPuntualidad,
          };

    try {
      const res = await fetch("/api/resena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al enviar la reseña");
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
            Escribir reseña
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
                ¡Reseña enviada!
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Gracias por tu opinión sobre {tab === "vehiculo" ? "el vehículo" : "el propietario"}.
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

            {/* Tabs */}
            <div className="flex rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-1">
              {(["vehiculo", "propietario"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); setError(null); }}
                  className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                    tab === t
                      ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {t === "vehiculo" ? "Vehículo" : "Propietario"}
                </button>
              ))}
            </div>

            {/* Calificación general */}
            <StarSelector
              label="Calificación general"
              value={calificacionGeneral}
              onChange={setCalificacionGeneral}
            />

            {/* Campos específicos por tab */}
            {tab === "vehiculo" ? (
              <>
                <StarSelector
                  label="Limpieza"
                  value={calificacionLimpieza}
                  onChange={setCalificacionLimpieza}
                />
                <StarSelector
                  label="Estado"
                  value={calificacionEstado}
                  onChange={setCalificacionEstado}
                />
                <StarSelector
                  label="Comodidad"
                  value={calificacionComodidad}
                  onChange={setCalificacionComodidad}
                />
              </>
            ) : (
              <>
                <StarSelector
                  label="Comunicación"
                  value={calificacionComunicacion}
                  onChange={setCalificacionComunicacion}
                />
                <StarSelector
                  label="Puntualidad"
                  value={calificacionPuntualidad}
                  onChange={setCalificacionPuntualidad}
                />
              </>
            )}

            {/* Descripción */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-primary)]">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Contá tu experiencia..."
                rows={3}
                className="w-full resize-none rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-focus)] focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleEnviar}
              disabled={isLoading}
              className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] disabled:opacity-60"
            >
              {isLoading
                ? "Enviando..."
                : `Enviar reseña de ${tab === "vehiculo" ? "vehículo" : "propietario"}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}