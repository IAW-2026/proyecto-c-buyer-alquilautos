import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { bd } from "@/lib/bd";
import FavoritesList from "@/components/favoritos/favorites-list";

export default async function FavoritosPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const pool = await bd.favoritePool.findUnique({
    where: { userId },
    include: { items: true },
  });

  const items = pool?.items ?? [];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-[var(--color-star)]"
          fill="currentColor"
        >
          <path d="M12 2l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 16.98 6.34 19.44l1.08-6.31-4.59-4.47 6.34-.92L12 2z" />
        </svg>
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Mis favoritos
          </h1>
          <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
            {items.length === 0
              ? "No tenés vehículos guardados"
              : `${items.length} vehículo${items.length !== 1 ? "s" : ""} guardado${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <FavoritesList initialItems={items} />
    </main>
  );
}