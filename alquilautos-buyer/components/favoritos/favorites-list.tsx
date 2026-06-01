"use client";

import { useState, useEffect } from "react";
import FavoriteCard from "@/components/favoritos/favorite-card";
import { deleteFavorito } from "@/app/actions/favorito";
import type { FavoriteItem } from "@prisma/client";
import type { SellerVehicle, SellerOwner } from "@/app/data/seller";
import type { CalificacionVehiculo } from "@/app/data/feedback";

type FavoritesListProps = {
  initialItems: FavoriteItem[];
};

export default function FavoritesList({ initialItems }: FavoritesListProps) {
  const [items, setItems] = useState<FavoriteItem[]>(initialItems);
  const [vehicles, setVehicles] = useState<SellerVehicle[]>([]);
  const [owners, setOwners] = useState<SellerOwner[]>([]);
  const [calificaciones, setCalificaciones] = useState<CalificacionVehiculo[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/vehiculo/disponible");
        if (!res.ok) return;

        const { vehiculos } = await res.json();
        setVehicles(vehiculos);

        const ownersRaw = await Promise.all(
          vehiculos.map((v: SellerVehicle) =>
            fetch(`/api/propietario/${v.id_propietario}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null),
          ),
        );
        setOwners(ownersRaw.filter(Boolean));

        const cals = await Promise.all(
          vehiculos.map((v: SellerVehicle) =>
            fetch(`/api/promedio/vehiculo/${v.id_vehiculo}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null),
          ),
        );
        setCalificaciones(cals.filter(Boolean));
      } catch {
        // mantiene arrays vacíos
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (vehiculoExternoId: number) => {
    setDeletingId(vehiculoExternoId);

    try {
      await deleteFavorito(vehiculoExternoId);
      setItems((prev) =>
        prev.filter((item) => item.vehiculoExternoId !== vehiculoExternoId),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-16 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10 text-[var(--color-star)]"
          fill="currentColor"
        >
          <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
        </svg>
        <p className="text-base font-semibold text-[var(--text-primary)]">
          No tenés favoritos aún
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          Explorá los vehículos disponibles y agregá los que más te gusten.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const vehicle = vehicles.find((v) => v.id_vehiculo === item.vehiculoExternoId);
        const owner = vehicle
          ? owners.find((o) => o.id_propietario === vehicle.id_propietario)
          : undefined;
        const calificacion = calificaciones.find(
          (c) => c.id_vehiculo === item.vehiculoExternoId,
        )?.calificacion_promedio;

        if (!vehicle) return null;

        return (
          <FavoriteCard
            key={item.id}
            vehicle={vehicle}
            owner={owner}
            calificacion={calificacion}
            onDelete={handleDelete}
            isDeleting={deletingId === item.vehiculoExternoId}
          />
        );
      })}
    </div>
  );
}