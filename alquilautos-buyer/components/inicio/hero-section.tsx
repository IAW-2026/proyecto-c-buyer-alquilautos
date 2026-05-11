"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [model, setModel] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (model.trim()) {
      params.set("modelo", model.trim());
    }

    if (maxPrice.trim()) {
      params.set("precioMax", maxPrice.trim());
    }

    const queryString = params.toString();
    router.push(`/dashboard${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <section className="relative flex min-h-[560px] w-full items-center overflow-hidden py-14 md:min-h-[680px] md:py-24 lg:min-h-[1000px]">
      <Image
        src="/indice.webp"
        alt="Auto destacado"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      <div className="relative z-10 w-full px-4 pt-20 md:px-8 md:pt-24">
        <div className="mx-auto grid w-full max-w-3xl gap-8 text-center md:gap-10">
          <div className="grid gap-3 text-center -mt-4 md:-mt-8">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Alquilautos</h1>
            <p className="text-lg font-semibold text-white/90 md:text-xl">
              Tu auto ideal, sin vueltas.
            </p>
          </div>

          <div className="mt-2">
            <p className="text-sm font-semibold text-white/90">
              Ingresa el modelo y el precio maximo por dia para filtrar resultados.
            </p>
            <div className="mx-auto mt-2 grid w-full max-w-3xl gap-3 rounded-2xl bg-white/90 p-4 text-left shadow-lg backdrop-blur md:grid-cols-[1.6fr_1fr_auto]">
              <label className="flex flex-col gap-2 text-left text-sm font-medium text-[var(--text-primary)]">
                Modelo
                <input
                  type="text"
                  placeholder="Ej: Corolla, Focus, 208"
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-white px-4 text-sm outline-none focus:border-[var(--border-focus)]"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2 text-left text-sm font-medium text-[var(--text-primary)]">
                Precio maximo por dia
                <input
                  type="number"
                  placeholder="Ej: 25000"
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-white px-4 text-sm outline-none focus:border-[var(--border-focus)]"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                />
              </label>
              <div className="flex items-end">
                <button
                  type="button"
                  className="h-11 w-full rounded-xl bg-[var(--btn-primary-bg)] px-6 text-sm font-semibold text-[var(--btn-primary-text)]"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
