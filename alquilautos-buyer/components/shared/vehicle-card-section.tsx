"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import type { SellerVehicle } from "@/app/data/seller";

type VehicleCardProps = {
	vehicle: SellerVehicle;
	actionLabel?: string;
	actionHref?: string;
	calificacion?: number;
};

export default function VehicleCard({
	vehicle,
	actionLabel = "Reservar",
	actionHref,
	calificacion,
}: VehicleCardProps) {
	const { isSignedIn } = useUser();

	const actionClassName =
		"mt-4 h-10 w-full rounded-xl bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)]";

	const href = actionHref
		? isSignedIn
			? actionHref
			: "/sign-in"
		: undefined;

	return (
		<article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
			<div className="relative aspect-[4/3] overflow-hidden rounded-xl">
				<Image
					src={vehicle.fotos}
					alt={`${vehicle.marca} ${vehicle.modelo}`}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 320px"
				/>
				<span
					className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
						vehicle.estado === "disponible"
							? "bg-[var(--status-available-bg)] text-[var(--status-available-text)]"
							: "bg-[var(--status-unavailable-bg)] text-[var(--status-unavailable-text)]"
					}`}
				>
					{vehicle.estado === "disponible" ? "Disponible en este momento" : "Indisponible en este momento"}
				</span>
			</div>

			<div className="mt-4 flex items-start justify-between gap-4">
				<div>
					<h3 className="text-base font-semibold">
						{vehicle.marca} {vehicle.modelo}
					</h3>
					<p className="mt-1 text-sm text-[var(--text-secondary)]">
						{vehicle.año}{calificacion !== undefined ? ` · ${calificacion.toFixed(1)}★` : ""}
					</p>
				</div>
				<div className="text-right">
					<p className="text-lg font-semibold">${vehicle.precio}</p>
					<p className="text-xs text-[var(--text-secondary)]">/dia</p>
				</div>
			</div>

			<div className="mt-4 grid gap-2">
				{href ? (
					<Link
						href={href}
						className={`${actionClassName} inline-flex items-center justify-center`}
					>
						{actionLabel}
					</Link>
				) : (
					<button type="button" className={actionClassName}>
						{actionLabel}
					</button>
				)}
			</div>
		</article>
	);
}