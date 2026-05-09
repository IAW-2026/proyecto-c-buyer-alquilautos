import Image from "next/image";
import type { SellerVehicle } from "@/app/data/seller";

type VehicleCardProps = {
	vehicle: SellerVehicle;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
	return (
		<article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
			<div className="relative overflow-hidden rounded-xl">
				<Image
					src={vehicle.imagen}
					alt={`${vehicle.marca} ${vehicle.modelo}`}
					width={640}
					height={400}
					className="h-44 w-full object-cover"
				/>
				<span className="absolute right-3 top-3 rounded-full bg-[var(--status-available-bg)] px-3 py-1 text-xs font-semibold text-[var(--status-available-text)]">
					Disponible
				</span>
			</div>

			<div className="mt-4 flex items-start justify-between gap-4">
				<div>
					<h3 className="text-base font-semibold">
						{vehicle.marca} {vehicle.modelo}
					</h3>
					<p className="mt-1 text-sm text-[var(--text-secondary)]">
						{vehicle.año} · {vehicle.calificacion.toFixed(1)}★
					</p>
				</div>
				<div className="text-right">
					<p className="text-lg font-semibold">${vehicle.precio}</p>
					<p className="text-xs text-[var(--text-secondary)]">/dia</p>
				</div>
			</div>

			<button
				type="button"
				className="mt-4 h-10 w-full rounded-xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)]"
			>
				Reservar
			</button>
		</article>
	);
}
