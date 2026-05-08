"use client";

import { useEffect, useState } from "react";

type SellerOwner = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  calificacion: number;
};

type SellerVehicle = {
  id: number;
  id_propietario: number;
  marca: string;
  modelo: string;
  "año": number;
  precio: number;
  calificacion: number;
  imagen: string;
  estado: "disponible" | "indisponible";
};

type SellerData = {
  owners: SellerOwner[];
  vehicles: SellerVehicle[];
};

export default function DashboardPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [data, setData] = useState<SellerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    let isActive = true;

    const loadSellerData = async () => {
      try {
        const response = await fetch("/api/seller");

        if (!response.ok) {
          throw new Error("No se pudo cargar la data del seller");
        }

        const payload = (await response.json()) as SellerData;

        if (isActive) {
          setData(payload);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Error inesperado");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadSellerData();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-8">
        <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <h2 className="text-sm font-semibold">Filtros</h2>
            <div className="mt-4 grid gap-4 text-sm">
              <label className="flex flex-col gap-2">
                Modelo
                <input
                  type="text"
                  placeholder="Ej: Corolla"
                  className="h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 outline-none focus:border-[var(--border-focus)]"
                />
              </label>
              <label className="flex flex-col gap-2">
                Precio maximo por dia
                <input
                  type="number"
                  placeholder="Ej: 25000"
                  className="h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 outline-none focus:border-[var(--border-focus)]"
                />
              </label>
              <button
                type="button"
                className="h-10 rounded-xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)]"
              >
                Aplicar filtros
              </button>
            </div>
          </aside>

          <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Dashboard de vehiculos</h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Autos disponibles del propietario.
                </p>
              </div>
              {data ? (
                <span className="rounded-full bg-[var(--bg-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                  {data.vehicles.length} vehiculos
                </span>
              ) : null}
            </div>

            {error ? (
              <div className="mt-6 rounded-2xl border border-[var(--status-unavailable-border)] bg-[var(--status-unavailable-bg)] p-4 text-sm text-[var(--status-unavailable-text)]">
                {error}
              </div>
            ) : null}

            {isLoading ? (
              <div className="mt-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-secondary)]">
                Cargando datos desde /api/seller...
              </div>
            ) : null}

            {data ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {data.vehicles.map((vehiculo) => (
                  <article
                    key={vehiculo.id}
                    className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)]"
                  >
                    <div className="h-44 w-full bg-[var(--bg-surface)]">
                      <img
                        src={vehiculo.imagen}
                        alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-base font-semibold">
                            {vehiculo.marca} {vehiculo.modelo}
                          </h3>
                          <p className="text-xs text-[var(--text-secondary)]">
                            {vehiculo["año"]} · Calificacion {vehiculo.calificacion}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                            vehiculo.estado === "disponible"
                              ? "bg-[var(--status-available-bg)] text-[var(--status-available-text)]"
                              : "bg-[var(--status-unavailable-bg)] text-[var(--status-unavailable-text)]"
                          }`}
                        >
                          {vehiculo.estado}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="font-semibold">$ {vehiculo.precio}</span>
                        <button
                          type="button"
                          className="rounded-full bg-[var(--btn-primary-bg)] px-3 py-1 text-xs font-semibold text-[var(--btn-primary-text)]"
                        >
                          Ver detalle
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
    </div>
  );
}
