import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
        <section className="relative hidden min-h-screen lg:flex">
          <Image
            src="/login.webp"
            alt="Vehiculo en ruta"
            fill
            priority
            loading="eager"
            className="object-cover"
            sizes="(max-width: 1024px) 0vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="relative z-10 flex w-full flex-col items-start justify-end gap-6 pb-12 pl-14 pr-10 pt-10 text-left text-white">
            <div className="max-w-md space-y-3">
              <h1 className="text-3xl font-semibold">
                Tu proximo viaje comienza aqui
              </h1>
              <p className="text-sm text-white/80">
                Movilidad sin límites. Calidad sin compromisos.
              </p>
            </div>
          </div>
        </section>
        <section className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                Bienvenido de nuevo
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Inicia sesion para gestionar tus reservas y explorar nuestra
                flota.
              </p>
            </div>
            <SignIn />
          </div>
        </section>
      </div>
    </main>
  );
}
