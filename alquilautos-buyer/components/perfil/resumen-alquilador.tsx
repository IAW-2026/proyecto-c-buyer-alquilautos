"use client";

import { useState, useEffect } from "react";

type ResumenAlquilador = {
  resumen: string;
};

type ResumenAlquiladorProps = {
  userId: string;
};

export default function ResumenAlquilador({ userId }: ResumenAlquiladorProps) {
  const [resumen, setResumen] = useState<ResumenAlquilador | null>(null);

  useEffect(() => {
    fetch(`/api/resumen/alquilador/${userId}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setResumen(data))
      .catch(() => null);
  }, [userId]);

  if (!resumen) return null;

  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 sm:p-8">
      <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">
        Resumen de reseñas compilado por IA
      </h2>
      <p className="text-sm italic text-[var(--text-secondary)]">{resumen.resumen}</p>
    </div>
  );
}