type ReservaVehiculoInfoProps = {
  marca: string;
  modelo: string;
  año: number;
  precio: number;
};

export default function ReservaVehiculoInfo({
  marca,
  modelo,
  año,
  precio,
}: ReservaVehiculoInfoProps) {
  const campos = [
    { label: "Marca", value: marca },
    { label: "Modelo", value: modelo },
    { label: "Año", value: año },
    { label: "Precio por día", value: `$${precio.toLocaleString("es-AR")}` },
  ];

  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <h2 className="text-base font-semibold text-[var(--text-primary)]">
        Información del vehículo
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {campos.map((campo) => (
          <div
            key={campo.label}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3"
          >
            <p className="text-xs text-[var(--text-secondary)]">{campo.label}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{campo.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}