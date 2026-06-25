"use client";

import { useState, useEffect } from "react";
import Pagination from "@/components/shared/pagination";

const POR_PAGINA = 3;

type ResenaNorm = {
  id: number;
  calificacionGeneral: number;
  descripcion: string;
  fechaCreacion: string;
  calificacionComunicacion: number;
  calificacionPuntualidad: number;
};

function getEstadoMod(mods: { id: number; estado: string }[]): string {
  if (!mods?.length) return "PENDIENTE";
  return [...mods].sort((a, b) => b.id - a.id)[0].estado;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizar(raw: any): ResenaNorm | null {
  if (!raw) return null;

  // Formato camelCase con resenaPropietario anidado (respuesta real de la Feedback App)
  if (raw.resenaPropietario) {
    if (getEstadoMod(raw.moderaciones ?? []) !== "APROBADA") return null;
    return {
      id: raw.id,
      calificacionGeneral: raw.calificacionGeneral,
      descripcion: raw.descripcion,
      fechaCreacion: raw.fechaCreacion,
      calificacionComunicacion: raw.resenaPropietario.calificacionComunicacion,
      calificacionPuntualidad: raw.resenaPropietario.calificacionPuntualidad,
    };
  }

  // Formato snake_case plano (por si el list endpoint devuelve diferente)
  if (raw.calificacion_general !== undefined) {
    return {
      id: raw.id_resena ?? raw.id,
      calificacionGeneral: raw.calificacion_general,
      descripcion: raw.descripcion,
      fechaCreacion: raw.fecha_creacion,
      calificacionComunicacion: raw.calificacion_comunicacion,
      calificacionPuntualidad: raw.calificacion_puntualidad,
    };
  }

  return null;
}

function formatFecha(fecha: string): string {
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return fecha;
  return `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`;
}

function EstrellasMini({ valor }: { valor: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${s <= valor ? "text-[var(--color-star)]" : "text-[var(--border-strong)]"}`} fill={s <= valor ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function FilaCalificacion({ label, valor }: { label: string; valor: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      <EstrellasMini valor={valor} />
    </div>
  );
}

export default function ResenasPropietario({ propietarioId }: { propietarioId: string }) {
  const [resenas, setResenas] = useState<ResenaNorm[]>([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch(`/api/resena/propietario/${propietarioId}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const lista = data?.resenas ?? (data?.resena ? [data.resena] : []);
        const normalizadas = lista.map(normalizar).filter(Boolean) as ResenaNorm[];
        setResenas(normalizadas);
      })
      .catch(() => null);
  }, [propietarioId]);

  if (resenas.length === 0) return null;

  const totalPages = Math.ceil(resenas.length / POR_PAGINA);
  const paginadas = resenas.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Reseñas del propietario</h2>
        <span className="text-sm text-[var(--text-secondary)]">
          {resenas.length} reseña{resenas.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {paginadas.map((resena) => (
          <div key={resena.id} className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <EstrellasMini valor={resena.calificacionGeneral} />
              <p className="text-xs text-[var(--text-tertiary)]">{formatFecha(resena.fechaCreacion)}</p>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resena.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Comunicación" valor={resena.calificacionComunicacion} />
              <FilaCalificacion label="Puntualidad" valor={resena.calificacionPuntualidad} />
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={pagina} totalPages={totalPages} onPageChange={setPagina} />
    </div>
  );
}
