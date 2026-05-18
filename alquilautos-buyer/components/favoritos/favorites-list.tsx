"use client";

import { useState } from "react";
import { sellerData } from "@/app/data/seller";
import FavoriteCard from "@/components/favoritos/favorite-card";
import type { FavoriteItem } from "@prisma/client";

type FavoritesListProps = {
  initialItems: FavoriteItem[];
};

export default function FavoritesList({ initialItems }: FavoritesListProps) {
  const [items, setItems] = useState<FavoriteItem[]>(initialItems);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (vehiculoExternoId: number) => {
    setDeletingId(vehiculoExternoId);

    try {
      const response = await fetch(`/api/favoritos/${vehiculoExternoId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar");

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
        const vehicle = sellerData.vehicles.find(
          (v) => v.id === item.vehiculoExternoId,
        );
        const owner = vehicle
          ? sellerData.owners.find((o) => o.id === vehicle.id_propietario)
          : undefined;

        if (!vehicle) return null;

        return (
          <FavoriteCard
            key={item.id}
            vehicle={vehicle}
            owner={owner}
            onDelete={handleDelete}
            isDeleting={deletingId === item.vehiculoExternoId}
          />
        );
      })}
    </div>
  );
}