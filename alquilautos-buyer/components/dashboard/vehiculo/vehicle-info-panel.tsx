type VehicleInfoPanelProps = {
  marca: string;
  modelo: string;
  año: number;
  precio: number;
};

export default function VehicleInfoPanel({
  marca,
  modelo,
  año,
  precio,
}: VehicleInfoPanelProps) {
  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <h2 className="text-base font-semibold text-[var(--text-primary)]">
        Información del vehículo
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
          <p className="text-xs text-[var(--text-secondary)]">Marca</p>
          <p className="mt-1 text-sm font-semibold">{marca}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
          <p className="text-xs text-[var(--text-secondary)]">Modelo</p>
          <p className="mt-1 text-sm font-semibold">{modelo}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
          <p className="text-xs text-[var(--text-secondary)]">Año</p>
          <p className="mt-1 text-sm font-semibold">{año}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
          <p className="text-xs text-[var(--text-secondary)]">Precio por día</p>
          <p className="mt-1 text-sm font-semibold">
            ${precio.toLocaleString("es-AR")}
          </p>
        </div>
      </div>
    </div>
  );
}