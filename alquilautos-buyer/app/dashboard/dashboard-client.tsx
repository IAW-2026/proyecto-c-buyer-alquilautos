"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterSection from "@/components/dashboard/filter-section";
import DashboardVehiclesSection from "@/components/shared/dashboard-vehicles-section";
import useFilteredVehicles from "@/hooks/use-filtered-vehicles";
import type { SellerData, SellerVehicle } from "@/app/data/seller";
import type { CalificacionVehiculo } from "@/app/data/feedback";

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SellerData | null>(null);
  const [calificaciones, setCalificaciones] = useState<CalificacionVehiculo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelFilter, setModelFilter] = useState(
    () => searchParams?.get("modelo") ?? "",
  );
  const [maxPriceFilter, setMaxPriceFilter] = useState(
    () => searchParams?.get("precioMax") ?? "",
  );

  useEffect(() => {
  let isActive = true;

  const loadData = async () => {
    try {
      const res = await fetch("/api/vehiculo/disponible");
      if (!res.ok) throw new Error("No se pudo cargar los vehículos");

      const { vehiculos } = await res.json();

      const cals = await Promise.all(
        vehiculos.map((v: SellerVehicle) =>
          fetch(`/api/resena/vehiculo/${v.id}/promedio`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ),
      );

      if (isActive) {
        setData({ vehicles: vehiculos, owners: [] });
        setCalificaciones(cals.filter(Boolean));
      }
    } catch (err) {
      if (isActive) {
        setError(err instanceof Error ? err.message : "Error inesperado");
      }
    } finally {
      if (isActive) setIsLoading(false);
    }
  };

  loadData();
  return () => { isActive = false; };
}, []);

  const filteredVehicles = useFilteredVehicles(data?.vehicles, {
    modelFilter,
    maxPriceFilter,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-8 pt-25">
      <div className="flex w-full flex-col gap-8">
        <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <FilterSection
            modelFilter={modelFilter}
            maxPriceFilter={maxPriceFilter}
            onModelChange={setModelFilter}
            onMaxPriceChange={setMaxPriceFilter}
          />
          <DashboardVehiclesSection
            vehicles={filteredVehicles ?? null}
            calificaciones={calificaciones}
            error={error}
            isLoading={isLoading}
          />
        </section>
      </div>
    </main>
  );
}