"use client";

import { useState } from "react";
import VehicleCard from "@/components/shared/vehicle-card-section";

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

type DashboardVehiclesSectionProps = {
	vehicles: SellerVehicle[] | null;
	error: string | null;
	isLoading: boolean;
};

const PAGE_SIZE = 9;

export default function DashboardVehiclesSection({
	vehicles,
	error,
	isLoading,
}: DashboardVehiclesSectionProps) {
	const [page, setPage] = useState(1);

	const totalPages = vehicles ? Math.ceil(vehicles.length / PAGE_SIZE) : 1;
	const paginated = vehicles
		? vehicles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
		: null;

	return (
		<div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold">Dashboard de vehiculos</h2>
					<p className="mt-1 text-sm text-[var(--text-secondary)]">
						Autos disponibles del propietario.
					</p>
				</div>
				{vehicles ? (
					<span className="rounded-full bg-[var(--bg-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
						{vehicles.length} vehiculos
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
					Cargando datos...
				</div>
			) : null}

			{paginated ? (
				<>
					<div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
						{paginated.map((vehiculo) => (
							<VehicleCard
								key={vehiculo.id}
								vehicle={vehiculo}
								actionLabel="Mas Detalles"
								actionHref={`/dashboard/vehiculo/${vehiculo.id}`}
								secondaryActionLabel="Agregar a favoritos"
								secondaryActionHref="/favoritos"
							/>
						))}
					</div>

					{totalPages > 1 ? (
						<div className="mt-8 flex items-center justify-center gap-2">
							<button
								type="button"
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--text-primary)] disabled:opacity-40"
							>
								‹
							</button>

							{Array.from({ length: totalPages }).map((_, i) => (
								<button
									key={i}
									type="button"
									onClick={() => setPage(i + 1)}
									className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-semibold transition ${
										page === i + 1
											? "border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
											: "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
									}`}
								>
									{i + 1}
								</button>
							))}

							<button
								type="button"
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
								className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--text-primary)] disabled:opacity-40"
							>
								›
							</button>
						</div>
					) : null}
				</>
			) : null}
		</div>
	);
}