import { completeOnboarding } from "./actions";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-6 py-16">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            Alquilautos
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Completa tus datos
          </h1>
          <p className="text-sm text-slate-600">
            Necesitamos esta informacion para habilitar reservas y facturacion.
          </p>
        </div>

        <form action={completeOnboarding} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Fecha de nacimiento
              <input
                type="date"
                name="fechaNacimiento"
                required
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              DNI
              <input
                type="text"
                name="numeroDocumento"
                required
                placeholder="00000000"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            Licencia de conducir
            <input
              type="text"
              name="licenciaConducir"
              required
              placeholder="ABC123456"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            Direccion de facturacion
            <input
              type="text"
              name="direccionFacturacion"
              required
              placeholder="Calle 123, Ciudad"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </label>

          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200/70 transition hover:bg-amber-400"
          >
            Guardar y continuar
          </button>
        </form>
      </div>
    </main>
  );
}
