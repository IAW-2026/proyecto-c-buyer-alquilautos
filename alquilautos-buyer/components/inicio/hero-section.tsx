import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-4 md:py-8">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-stretch">
        <div>
          <h1 className="text-3xl font-semibold">Alquilautos</h1>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Encontrá el vehículo perfecto alquilando directamente a dueños particulares. Elegí el auto que mejor se adapte a vos, reservalo por el tiempo exacto que necesites y empezá a disfrutar de tu viaje sin burocracia ni letras chicas.
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Busca tu auto ideal</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Ingresa el modelo y el precio maximo por dia para filtrar resultados.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-[1.6fr_1fr_auto]">
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
          </div>
        </div>

        <div className="h-full overflow-hidden rounded-3xl">
          <Image
            src="/indice.webp"
            alt="Auto destacado"
            width={900}
            height={600}
            className="h-full w-full rounded-3xl object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
