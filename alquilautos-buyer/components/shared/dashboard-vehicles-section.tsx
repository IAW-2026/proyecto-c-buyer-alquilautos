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

export default function DashboardVehiclesSection({
	vehicles,
	error,
	isLoading,
}: DashboardVehiclesSectionProps) {
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
					Cargando datos desde /api/seller...
				</div>
			) : null}

			{vehicles ? (
				<div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{vehicles.map((vehiculo) => (
						<VehicleCard
							key={vehiculo.id}
							vehicle={vehiculo}
							actionLabel="Reservar"
							secondaryActionLabel="Agregar a favoritos"
						/>
					))}
				</div>
			) : null}
		</div>
	);
}
