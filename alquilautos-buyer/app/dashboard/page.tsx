"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterSection from "@/components/dashboard/filter-section";
import DashboardVehiclesSection from "@/components/dashboard/dashboard-vehicles-section";

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
  const [data, setData] = useState<SellerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelFilter, setModelFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");

  useEffect(() => {
    setModelFilter(searchParams?.get("modelo") ?? "");
    setMaxPriceFilter(searchParams?.get("precioMax") ?? "");
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
          <DashboardVehiclesSection
            vehicles={data?.vehicles ?? null}
            error={error}
            isLoading={isLoading}
          />
      </section>
    </div>
  );
}
