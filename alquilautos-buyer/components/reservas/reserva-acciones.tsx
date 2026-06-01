"use client";

import { useState } from "react";
import type { EstadoReserva } from "@/app/data/reservas";
import CancelarReservaModal from "@/components/reservas/cancelar-reserva-modal";
import CoordinarEntregaModal from "@/components/reservas/coordinar-entrega-modal";
import PagoLinkModal from "@/components/reservas/pago-link-modal";
import ResenaModal from "@/components/reservas/resena-modal";

type ReservaAccionesProps = {
  idReserva: number;
  estado: EstadoReserva;
  idVehiculo: number;
  idPropietario: number;
  idEmisor: string;
};

export default function ReservaAcciones({
  idReserva,
  estado,
  idVehiculo,
  idPropietario,
  idEmisor,
}: ReservaAccionesProps) {
  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [showCoordinarModal, setShowCoordinarModal] = useState(false);
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [showResenaModal, setShowResenaModal] = useState(false);

  return (
    <>
      {estado === "Coordinada" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2.5">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[var(--status-unavailable-text)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm font-medium text-[var(--status-unavailable-text)]">
              Pago pendiente
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPagoModal(true)}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)]"
          >
            Pagar
          </button>
        </div>
      )}

      {estado === "Aceptada" && (
        <button
          type="button"
          onClick={() => setShowCoordinarModal(true)}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-success-500)] text-sm font-semibold text-white transition hover:opacity-90"
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

      {estado === "Finalizada" && (
      <button
        type="button"
        onClick={() => setShowResenaModal(true)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--color-accent-400)] bg-[var(--color-accent-50)] text-sm font-semibold text-[var(--color-accent-600)] transition hover:bg-[var(--color-accent-100)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-accent-400)]" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
        </svg>
        Escribir reseña
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
          onClose={() => setShowCoordinarModal(false)}
        />
      )}

      {showPagoModal && (
        <PagoLinkModal
          idReserva={idReserva}
          onClose={() => setShowPagoModal(false)}
        />
      )}

      {showResenaModal && (
        <ResenaModal
          idReserva={idReserva}
          idVehiculo={idVehiculo}
          idPropietario={idPropietario}
          idEmisor={idEmisor}
          onClose={() => setShowResenaModal(false)}
        />
      )}
    </>
  );
}