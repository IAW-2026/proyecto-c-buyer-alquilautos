import { sellerData, type SellerVehicle, type SellerOwner } from "@/app/data/seller";

// TODO: reemplazar por fetch real a la Seller App
// import { env } from "@/env";

export async function getVehiculos(): Promise<SellerVehicle[]> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo`);
  // return res.json();
  return sellerData.vehicles;
}

export async function getVehiculoById(id: number): Promise<SellerVehicle | null> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/vehiculo/${id}`);
  // return res.json();
  return sellerData.vehicles.find((v) => v.id === id) ?? null;
}

export async function getPropietarios(): Promise<SellerOwner[]> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario`);
  // return res.json();
  return sellerData.owners;
}

export async function getPropietarioById(id: number): Promise<SellerOwner | null> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/propietario/${id}`);
  // return res.json();
  return sellerData.owners.find((o) => o.id === id) ?? null;
}