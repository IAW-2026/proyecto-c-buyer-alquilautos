import { sellerData, type SellerVehicle, type SellerOwner } from "@/app/data/seller";

export async function getVehiculos(): Promise<SellerVehicle[]> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo/disponible`);
  // return (await res.json()).vehiculos;
  return sellerData.vehicles;
}

export async function getVehiculoById(id: number): Promise<SellerVehicle | null> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo/disponible`);
  // const { vehiculos } = await res.json();
  // return vehiculos.find((v: SellerVehicle) => v.id === id) ?? null;
  return sellerData.vehicles.find((v) => v.id === id) ?? null;
}

export async function getPropietarios(): Promise<SellerOwner[]> {
  // TODO: no hay endpoint bulk, habría que fetchear uno por uno
  return sellerData.owners;
}

export async function getPropietarioById(id: number): Promise<SellerOwner | null> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario/${id}`);
  // return res.ok ? res.json() : null;
  return sellerData.owners.find((o) => o.id_propietario === id) ?? null;
}