import StarRating from "@/components/dashboard/vehiculo/star-rating";

type OwnerCardProps = {
  nombre: string;
  email: string;
  telefono: string;
  calificacion?: number;
};

export default function OwnerCard({
  nombre,
  email,
  telefono,
  calificacion,
}: OwnerCardProps) {
  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <h2 className="text-sm font-semibold text-[var(--text-secondary)]">
        Propietario
      </h2>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-sm font-bold text-white">
          {nombre.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {nombre}
          </p>
          {calificacion !== undefined && (
            <StarRating
              rating={calificacion}
              valueClassName="text-xs text-[var(--text-secondary)]"
            />
          )}
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6.4 6.4l1.07-1.07a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>{telefono}</span>
        </div>
      </div>
    </div>
  );
}