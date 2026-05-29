type ReservaPropietarioProps = {
  nombre: string;
  apellido: string;
  email: string;
};

export default function ReservaPropietario({ nombre, apellido, email }: ReservaPropietarioProps) {
  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <h2 className="text-sm font-semibold text-[var(--text-secondary)]">Propietario</h2>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-sm font-bold text-white">
          {nombre.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{nombre} {apellido}</p>
          <p className="text-xs text-[var(--text-secondary)]">{email}</p>
        </div>
      </div>
    </div>
  );
}