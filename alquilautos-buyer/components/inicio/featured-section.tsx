import { sellerData } from "@/app/data/seller";
import VehicleCard from "@/components/inicio/vehicle-card-section";

const pickRandomVehicles = (count: number) => {
  const availableVehicles = sellerData.vehicles.filter(
    (vehicle) => vehicle.estado === "disponible",
  );
  const shuffled = [...availableVehicles];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled.slice(0, count);
};

export default function FeaturedSection() {
  const featuredVehicles = pickRandomVehicles(4);

  return (
    <section className="py-4 md:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Vehiculos destacados</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Selección exclusiva de autos para tu comodidad.
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-[var(--btn-primary-bg)]"
        >
          View all
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {featuredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
