"use client";

import { useState } from "react";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { completarOnboarding } from "@/app/actions/onboarding";

type FormData = {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  numeroDocumento: string;
  licenciaConducir: string;
  direccionFacturacion: string;
};

type FieldConfig = {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder?: string;
};

const FIELDS: FieldConfig[] = [
  { name: "nombre", label: "Nombre", type: "text", placeholder: "Juan" },
  { name: "apellido", label: "Apellido", type: "text", placeholder: "Pérez" },
  { name: "fechaNacimiento", label: "Fecha de nacimiento", type: "date" },
  { name: "numeroDocumento", label: "DNI", type: "text", placeholder: "12345678" },
  { name: "licenciaConducir", label: "Licencia de conducir", type: "text", placeholder: "ABC123456" },
  { name: "direccionFacturacion", label: "Dirección de facturación", type: "text", placeholder: "Calle 123, Ciudad" },
];

const INITIAL_FORM: FormData = {
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  numeroDocumento: "",
  licenciaConducir: "",
  direccionFacturacion: "",
};

export default function OnboardingPage() {
  const { session } = useClerk();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await completarOnboarding(formData);

    if ("error" in result) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    await session?.reload();
    window.location.href = "/";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-page)] px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image
            src="/logo.png"
            alt="Alquilautos"
            width={56}
            height={56}
            priority
            loading="eager"
            style={{ width: "56px", height: "56px" }}
          />
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Completá tu perfil
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Necesitamos estos datos para habilitar tus reservas y facturación.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 shadow-[var(--shadow-md)]">
          {error && (
            <div className="mb-6 rounded-2xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] p-4 text-sm text-[var(--status-unavailable-text)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <label
                  key={field.name}
                  className={`flex flex-col gap-2 text-sm font-medium text-[var(--text-primary)] ${
                    field.name === "direccionFacturacion" ? "sm:col-span-2" : ""
                  }`}
                >
                  {field.label}
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-primary-100)]"
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] disabled:opacity-60"
            >
              {isLoading ? "Guardando..." : "Guardar y continuar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}