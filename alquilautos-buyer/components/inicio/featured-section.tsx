"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { SellerVehicle } from "@/app/data/seller";
import type { CalificacionVehiculo } from "@/app/data/feedback";
import VehicleCard from "@/components/shared/vehicle-card-section";

const pickTopRatedVehicles = (vehicles: SellerVehicle[], count: number, calificaciones: CalificacionVehiculo[]) =>
  vehicles
    .filter((vehicle) => vehicle.estado === "disponible")
    .slice()
    .sort((a, b) => {
      const calA = calificaciones.find((c) => c.id_vehiculo === a.id_vehiculo)?.calificacion_promedio ?? 0;
      const calB = calificaciones.find((c) => c.id_vehiculo === b.id_vehiculo)?.calificacion_promedio ?? 0;
      if (calB !== calA) return calB - calA;
      return a.precio - b.precio;
    })
    .slice(0, count);

export default function FeaturedSection() {
  const [vehicles, setVehicles] = useState<SellerVehicle[]>([]);
  const [calificaciones, setCalificaciones] = useState<CalificacionVehiculo[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/vehiculo/disponible");
        if (!res.ok) return;

        const { vehiculos } = await res.json();
        setVehicles(vehiculos);

        const cals = await Promise.all(
          vehiculos.map((v: SellerVehicle) =>
            fetch(`/api/promedio/vehiculo/${v.id_vehiculo}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null),
          ),
        );
        setCalificaciones(cals.filter(Boolean));
      } catch {
        // sin datos, muestra lista vacía
      }
    };

    fetchData();
  }, []);

  const featuredVehicles = pickTopRatedVehicles(vehicles, 7, calificaciones);

  return (
    <section className="relative py-4 md:py-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Vehiculos destacados
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Selección exclusiva de autos para tu comodidad.
        </p>
      </div>

      <div className="mt-6 px-6">
        <div
          ref={trackRef}
          className="mx-auto flex max-w-[1352px] gap-6 overflow-x-auto pb-2 snap-x snap-mandatory select-none scroll-smooth touch-pan-x [-webkit-overflow-scrolling:touch]"
        >
          {featuredVehicles.map((vehicle) => {
            const calificacion = calificaciones.find(
              (c) => c.id_vehiculo === vehicle.id_vehiculo,
            )?.calificacion_promedio;

            return (
              <div key={vehicle.id_vehiculo} className="w-[320px] shrink-0 snap-start">
                <VehicleCard
                  vehicle={vehicle}
                  actionLabel="Mas detalles"
                  actionHref={`/dashboard/vehiculo/${vehicle.id_vehiculo}`}
                  calificacion={calificacion}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href="/dashboard"
          className="h-10 w-full max-w-xs rounded-xl bg-[var(--btn-primary-bg)] text-center text-sm font-semibold leading-10 text-[var(--btn-primary-text)]"
        >
          Mirar todos
        </Link>
      </div>
    </section>
  );
}