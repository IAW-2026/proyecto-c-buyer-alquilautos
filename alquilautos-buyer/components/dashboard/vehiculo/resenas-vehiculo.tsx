"use client";

import { useState, useEffect } from "react";

type ResenaVehiculo = {
  id_resena: number;
  id_reserva: number;
  id_emisor: number;
  calificacion_general: number;
  descripcion: string;
  fecha_creacion: string;
  calificacion_limpieza: number;
  calificacion_estado: number;
  calificacion_comodidad: number;
};

function EstrellasMini({ valor }: { valor: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 ${s <= valor ? "text-[var(--color-star)]" : "text-[var(--border-strong)]"}`}
          fill={s <= valor ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
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

export default function ResenasVehiculo({ vehiculoId }: { vehiculoId: number }) {
  const [resenas, setResenas] = useState<ResenaVehiculo[]>([]);

  useEffect(() => {
    fetch(`/api/resena/vehiculo/${vehiculoId}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setResenas(data?.resenas ?? []))
      .catch(() => null);
  }, [vehiculoId]);

  if (resenas.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">Reseñas del vehículo</h2>
      <div className="flex flex-col gap-4">
        {resenas.map((resena) => (
          <div key={resena.id_resena} className="flex flex-col gap-3 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between">
              <EstrellasMini valor={resena.calificacion_general} />
              <p className="text-xs text-[var(--text-tertiary)]">{resena.fecha_creacion}</p>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{resena.descripcion}</p>
            <div className="flex flex-col gap-1.5 border-t border-[var(--border-default)] pt-3">
              <FilaCalificacion label="Limpieza" valor={resena.calificacion_limpieza} />
              <FilaCalificacion label="Estado" valor={resena.calificacion_estado} />
              <FilaCalificacion label="Comodidad" valor={resena.calificacion_comodidad} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}