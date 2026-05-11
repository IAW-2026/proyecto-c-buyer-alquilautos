"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterSection from "@/components/dashboard/filter-section";
import VehicleCard from "@/components/shared/vehicle-card-section";

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
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [data, setData] = useState<SellerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelFilter, setModelFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setModelFilter(searchParams.get("modelo") ?? "");
    setMaxPriceFilter(searchParams.get("precioMax") ?? "");
  }, [searchParams]);

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
          <FilterSection
            modelFilter={modelFilter}
            maxPriceFilter={maxPriceFilter}
            onModelChange={setModelFilter}
            onMaxPriceChange={setMaxPriceFilter}
          />

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
                  <VehicleCard
                    key={vehiculo.id}
                    vehicle={vehiculo}
                    actionLabel="Reservar"
                    secondaryActionLabel="Agregar a favoritos"
                  />
                ))}
              </div>
            ) : null}
          </div>
      </section>
    </div>
  );
}
