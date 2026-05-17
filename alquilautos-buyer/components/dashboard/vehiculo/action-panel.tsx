import Link from "next/link";
import StarRating from "@/components/dashboard/vehiculo/star-rating";

type ActionPanelProps = {
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  calificacion: number;
};

export default function ActionPanel({
  marca,
  modelo,
  año,
  precio,
  calificacion,
}: ActionPanelProps) {
  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
        {marca} {modelo}
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{año}</p>

      <div className="mt-3">
        <StarRating rating={calificacion} />
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-3xl font-bold text-[var(--text-primary)]">
          ${precio.toLocaleString("es-AR")}
        </span>
        <span className="mb-1 text-sm text-[var(--text-secondary)]">/ día</span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href="/dashboard"
          className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)]"
        >
          Reservar ahora
        </Link>
        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 text-[var(--color-star)]"
            fill="currentColor"
          >
            <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
          </svg>
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
}