import type { EstadoReserva } from "@/app/data/reservas";

type ReservaResumenProps = {
  idReserva: number;
  estado: EstadoReserva;
  fechaInicio: string;
  fechaFinal: string;
  dias: number;
  total: number | null;
};

const estadoStyles: Record<EstadoReserva, string> = {
  Pendiente: "bg-[var(--color-accent-100)] text-[var(--color-accent-700)]",
  Confirmada: "bg-[var(--status-available-bg)] text-[var(--status-available-text)]",
  Rechazada: "bg-[var(--status-unavailable-bg)] text-[var(--status-unavailable-text)]",
};

function formatearFecha(fecha: string): string {
  const [año, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${año}`;
}

export default function ReservaResumen({
  idReserva,
  estado,
  fechaInicio,
  fechaFinal,
  dias,
  total,
}: ReservaResumenProps) {
  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">
          Reserva #{idReserva}
        </h2>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${estadoStyles[estado]}`}>
          {estado}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--text-secondary)]">Fecha de inicio</span>
          <span className="font-medium text-[var(--text-primary)]">{formatearFecha(fechaInicio)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--text-secondary)]">Fecha de fin</span>
          <span className="font-medium text-[var(--text-primary)]">{formatearFecha(fechaFinal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--text-secondary)]">Duración</span>
          <span className="font-medium text-[var(--text-primary)]">{dias} día{dias !== 1 ? "s" : ""}</span>
        </div>
        {total !== null && (
          <div className="flex justify-between border-t border-[var(--border-default)] pt-3">
            <span className="font-semibold text-[var(--text-primary)]">Total estimado</span>
            <span className="text-lg font-bold text-[var(--text-primary)]">${total.toLocaleString("es-AR")}</span>
          </div>
        )}
      </div>
    </div>
  );
}