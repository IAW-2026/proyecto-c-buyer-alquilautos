"use client";

import { useMemo } from "react";

type FilterableVehicle = {
  modelo: string;
  precio: number;
  estado: "disponible" | "indisponible";
};

type UseFilteredVehiclesOptions = {
  modelFilter: string;
  maxPriceFilter: string;
};

export default function useFilteredVehicles<T extends FilterableVehicle>(
  vehicles: T[] | null | undefined,
  { modelFilter, maxPriceFilter }: UseFilteredVehiclesOptions,
) {
  return useMemo(() => {
    if (!vehicles) {
      return null;
    }

    const normalizedModelFilter = modelFilter.trim().toLowerCase();
    const maxPriceValue = Number(maxPriceFilter);
    const hasMaxPriceFilter =
      maxPriceFilter.trim() !== "" && Number.isFinite(maxPriceValue);

    return vehicles.filter((vehicle) => {
      const matchesAvailability = vehicle.estado === "disponible";
      const matchesModel = normalizedModelFilter
        ? vehicle.modelo.toLowerCase().includes(normalizedModelFilter)
        : true;
      const matchesMaxPrice = hasMaxPriceFilter
        ? vehicle.precio <= maxPriceValue
        : true;

      return matchesAvailability && matchesModel && matchesMaxPrice;
    });
  }, [vehicles, modelFilter, maxPriceFilter]);
}
