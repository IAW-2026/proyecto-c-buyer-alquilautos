"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { eliminarUsuarioAdmin } from "@/app/actions/admin";

type Usuario = {
  id: string;
  email: string;
  nombre: string | null;
  apellido: string | null;
  numeroDocumento: string | null;
  calificacion: number;
  role: string | null;
};

type AdminUsuariosListProps = {
  usuarios: Usuario[];
};

export default function AdminUsuariosList({ usuarios: inicial }: AdminUsuariosListProps) {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState(inicial);
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null);
  const [eliminandoId, setEliminandoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEliminar = async (userId: string) => {
    setEliminandoId(userId);
    setError(null);
    try {
      await eliminarUsuarioAdmin(userId);
      setUsuarios((prev) => prev.filter((u) => u.id !== userId));
      setConfirmandoId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setEliminandoId(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="flex flex-col gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {usuario.nombre && usuario.apellido
                    ? `${usuario.nombre} ${usuario.apellido}`
                    : "Sin nombre"}
                </p>
                {usuario.role === "adminBuyer" && (
                  <span className="rounded-full bg-[var(--color-primary-50)] px-2 py-0.5 text-xs font-semibold text-[var(--color-primary-500)]">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{usuario.email}</p>
              <p className="text-xs text-[var(--text-tertiary)]">
                DNI: {usuario.numeroDocumento ?? "—"} · Calificación: {usuario.calificacion.toFixed(1)}
              </p>
            </div>

            <div className="flex gap-2 sm:shrink-0">
              {usuario.role !== "adminBuyer" && (
                <>
                  <button
                    type="button"
                    onClick={() => router.push(`/admin/usuario/${usuario.id}`)}
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-[var(--border-default)] bg-transparent px-4 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmandoId(usuario.id)}
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-[var(--status-unavailable-border)] bg-transparent px-4 text-xs font-semibold text-[var(--status-unavailable-text)] transition hover:bg-[var(--status-unavailable-bg)]"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] px-4 py-2 text-sm text-[var(--status-unavailable-text)]">
          {error}
        </div>
      )}

      {confirmandoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] px-4">
          <div className="w-full max-w-md rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-lg)]">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--status-unavailable-bg)]">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--status-unavailable-text)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  ¿Eliminar usuario?
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Esta acción es <span className="font-semibold text-[var(--status-unavailable-text)]">irreversible</span>. El usuario será eliminado de la base de datos y de Clerk.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleEliminar(confirmandoId)}
                  disabled={eliminandoId === confirmandoId}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] text-sm font-semibold text-[var(--status-unavailable-text)] transition hover:opacity-80 disabled:opacity-60"
                >
                  {eliminandoId === confirmandoId ? "Eliminando..." : "Sí, eliminar"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmandoId(null)}
                  disabled={!!eliminandoId}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[var(--border-default)] bg-transparent text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)] disabled:opacity-60"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}