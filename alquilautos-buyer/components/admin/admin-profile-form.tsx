"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { actualizarUsuarioAdmin } from "@/app/actions/admin";

type AdminProfileFormProps = {
  userId: string;
  nombre: string | null;
  apellido: string | null;
  email: string;
  fechaNacimiento: string | null;
  numeroDocumento: string | null;
  licenciaConducir: string | null;
  direccionFacturacion: string | null;
};

type FormData = {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  numeroDocumento: string;
  licenciaConducir: string;
  direccionFacturacion: string;
};

const fields = [
  { name: "nombre", label: "Nombre", type: "text" },
  { name: "apellido", label: "Apellido", type: "text" },
  { name: "fechaNacimiento", label: "Fecha de nacimiento", type: "date" },
  { name: "numeroDocumento", label: "DNI", type: "text" },
  { name: "licenciaConducir", label: "Licencia de conducir", type: "text" },
  { name: "direccionFacturacion", label: "Dirección de facturación", type: "text" },
] as const;

export default function AdminProfileForm({
  userId,
  nombre,
  apellido,
  email,
  fechaNacimiento,
  numeroDocumento,
  licenciaConducir,
  direccionFacturacion,
}: AdminProfileFormProps) {
  const router = useRouter();

  const initial: FormData = {
    nombre: nombre ?? "",
    apellido: apellido ?? "",
    fechaNacimiento: fechaNacimiento ?? "",
    numeroDocumento: numeroDocumento ?? "",
    licenciaConducir: licenciaConducir ?? "",
    direccionFacturacion: direccionFacturacion ?? "",
  };

  const [formData, setFormData] = useState<FormData>(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const result = await actualizarUsuarioAdmin(userId, formData);

    if ("error" in result) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text-disabled)] opacity-60 outline-none cursor-not-allowed"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
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
              className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-primary-100)]"
            />
          </label>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-[var(--status-available-border)] bg-[var(--status-available-bg)] px-4 py-2 text-sm text-[var(--status-available-text)]">
          Datos guardados correctamente.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-bg-hover)] disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          disabled={isLoading}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)] disabled:opacity-60 sm:w-auto sm:px-8"
        >
          Volver
        </button>
      </div>
    </form>
  );
}