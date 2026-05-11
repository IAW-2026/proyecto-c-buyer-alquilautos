"use client";

import { useRef, useState } from "react";
import { sellerData } from "@/app/data/seller";
import VehicleCard from "@/components/inicio/vehicle-card-section";

const pickTopRatedVehicles = (count: number) =>
  sellerData.vehicles
    .filter((vehicle) => vehicle.estado === "disponible")
    .slice()
    .sort((a, b) => {
      if (b.calificacion !== a.calificacion) {
        return b.calificacion - a.calificacion;
      }
      return a.precio - b.precio;
    })
    .slice(0, count);

export default function FeaturedSection() {
  const featuredVehicles = pickTopRatedVehicles(7);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
          {featuredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="w-[320px] shrink-0 snap-start"
            >
              <VehicleCard
                vehicle={vehicle}
                actionLabel="Mas detalles"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="h-10 w-full max-w-xs rounded-xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)]"
        >
          View all
        </button>
      </div>
    </section>
  );
}
