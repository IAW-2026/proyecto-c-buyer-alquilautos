export default function Home() {
  return (
    <div className="flex w-full flex-col gap-12">
      <header className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Alquilautos</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Encuentra el auto ideal para tu proximo viaje.
            </p>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)]">
        <h2 className="text-lg font-semibold">Busca tu auto ideal</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Ingresa el modelo y el precio maximo por dia para filtrar resultados.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-[1.6fr_1fr_auto]">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Modelo
            <input
              type="text"
              placeholder="Ej: Corolla, Focus, 208"
              className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 text-sm outline-none focus:border-[var(--border-focus)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Precio maximo por dia
            <input
              type="number"
              placeholder="Ej: 25000"
              className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 text-sm outline-none focus:border-[var(--border-focus)]"
            />
          </label>
          <div className="flex items-end">
            <button
              type="button"
              className="h-11 w-full rounded-xl bg-[var(--btn-primary-bg)] px-6 text-sm font-semibold text-[var(--btn-primary-text)]"
            >
              Buscar
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Como funciona Alquilautos</h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Un proceso simple y seguro para alquilar vehiculos entre personas.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]">
              1
            </div>
            <h3 className="mt-4 text-base font-semibold">Encuentra tu auto</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Busca por modelo, ubicacion y precio para elegir el vehiculo ideal.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--status-available-bg)] text-[var(--status-available-text)]">
              2
            </div>
            <h3 className="mt-4 text-base font-semibold">Reserva con confianza</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Coordinas fechas y pago seguro desde la plataforma.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--badge-accent-bg)] text-[var(--badge-accent-text)]">
              3
            </div>
            <h3 className="mt-4 text-base font-semibold">Retira y califica</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Retiras el auto, lo usas y luego dejas tu feedback.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
