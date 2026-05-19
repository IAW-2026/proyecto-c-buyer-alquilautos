"use client";

import { useState } from "react";
import type { EstadoReserva } from "@/app/data/reservas";
import CancelarReservaModal from "@/components/reservas/cancelar-reserva-modal";
import CoordinarEntregaModal from "@/components/reservas/coordinar-entrega-modal";

type ReservaAccionesProps = {
  idReserva: number;
  estado: EstadoReserva;
  fechaInicio: string;
  fechaFinal: string;
};

export default function ReservaAcciones({
  idReserva,
  estado,
  fechaInicio,
  fechaFinal,
}: ReservaAccionesProps) {
  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [showCoordinarModal, setShowCoordinarModal] = useState(false);

  return (
    <>
      {estado === "Confirmada" && (
        <button
          type="button"
          onClick={() => setShowCoordinarModal(true)}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--status-available-text)] text-sm font-semibold text-white transition hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Coordinar entrega
        </button>
      )}

      {estado === "Pendiente" && (
        <button
          type="button"
          onClick={() => setShowCancelarModal(true)}
          className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--status-unavailable-border)] bg-transparent text-sm font-semibold text-[var(--status-unavailable-text)] transition hover:bg-[var(--status-unavailable-bg)]"
        >
          Cancelar reserva
        </button>
      )}

      {showCancelarModal && (
        <CancelarReservaModal
          idReserva={idReserva}
          onClose={() => setShowCancelarModal(false)}
        />
      )}

      {showCoordinarModal && (
        <CoordinarEntregaModal
          idReserva={idReserva}
          fechaEntrega={fechaInicio}
          fechaDevolucion={fechaFinal}
          horaInicio="14:00"
          horaFin="19:00"
          onClose={() => setShowCoordinarModal(false)}
        />
      )}
    </>
  );
}