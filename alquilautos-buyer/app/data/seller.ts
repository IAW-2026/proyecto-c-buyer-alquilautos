export type SellerOwner = {
  id_propietario: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  direccion: string;
  fecha_nacimiento: string;
};

export type SellerVehicle = {
  id_vehiculo: string;
  id_propietario: string;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  fotos: string;
  estado: "disponible" | "indisponible";
};

export type SellerData = {
  owners: SellerOwner[];
  vehicles: SellerVehicle[];
};
