export default function HowItWorksSection() {
	return (
		<section className="py-4 md:py-8">
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
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--status-available-text)] text-[var(--text-inverse)]">
						2
					</div>
					<h3 className="mt-4 text-base font-semibold">Reserva con confianza</h3>
					<p className="mt-2 text-sm text-[var(--text-secondary)]">
						Coordinas fechas y pago seguro desde la plataforma.
					</p>
				</article>
				<article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 text-center">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--badge-accent-bg)] text-[var(--text-inverse)]">
						3
					</div>
					<h3 className="mt-4 text-base font-semibold">Retira y califica</h3>
					<p className="mt-2 text-sm text-[var(--text-secondary)]">
						Retiras el auto, lo usas y luego dejas tu feedback.
					</p>
				</article>
			</div>
		</section>
	);
}
