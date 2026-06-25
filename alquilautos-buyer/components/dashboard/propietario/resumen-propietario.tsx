"use client";

import { useState, useEffect } from "react";

type Estado = "cargando" | "ok" | "sin-resenas";

export default function ResumenPropietario({ propietarioId }: { propietarioId: string }) {
  const [resumen, setResumen] = useState<string | null>(null);
  const [estado, setEstado] = useState<Estado>("cargando");

  useEffect(() => {
    fetch(`/api/resumen/propietario/${propietarioId}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.resumen) {
          setResumen(data.resumen);
          setEstado("ok");
        } else {
          setEstado("sin-resenas");
        }
      })
      .catch(() => setEstado("sin-resenas"));
  }, [propietarioId]);

  if (estado === "cargando") {
    return (
      <div className="space-y-2">
        <div className="h-3 w-36 animate-pulse rounded-full bg-[var(--bg-elevated)]" />
        <div className="h-3 w-full animate-pulse rounded-full bg-[var(--bg-elevated)]" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-[var(--bg-elevated)]" />
        <div className="h-3 w-4/6 animate-pulse rounded-full bg-[var(--bg-elevated)]" />
      </div>
    );
  }

  if (estado === "sin-resenas") {
    return (
      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
          </svg>
          Resumen generado por IA
        </p>
        <p className="text-sm italic text-[var(--text-tertiary)]">
          Aún no hay suficientes reseñas para generar un resumen de este propietario.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[var(--color-star)]" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
        </svg>
        Resumen generado por IA
      </p>
      <p className="text-sm italic text-[var(--text-secondary)]">{resumen}</p>
    </div>
  );
}
