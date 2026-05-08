export type SellerOwner = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  calificacion: number;
};

export type SellerVehicle = {
  id: number;
  id_propietario: number;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  calificacion: number;
  imagen: string;
  estado: "disponible" | "indisponible";
};

export type SellerData = {
  owner: SellerOwner;
  vehicles: SellerVehicle[];
};

export const sellerData: SellerData = {
  owner: {
    id: 458976,
    nombre: "Lucia Benitez",
    email: "lucia.benitez@example.com",
    telefono: "+54 9 11 5555 0101",
    calificacion: 4.7,
  },
  vehicles: [
    {
      id: 897654,
      id_propietario: 458976,
      marca: "Toyota",
      modelo: "Corolla",
      año: 2021,
      precio: 22000,
      calificacion: 4.6,
      imagen: "/vehiculos/corolla.webp",
      estado: "disponible",
    },
    {
      id: 897655,
      id_propietario: 458976,
      marca: "Ford",
      modelo: "Focus",
      año: 2019,
      precio: 18000,
      calificacion: 4.3,
      imagen: "/vehiculos/focus.webp",
      estado: "disponible",
    },
    {
      id: 897656,
      id_propietario: 458976,
      marca: "Peugeot",
      modelo: "208",
      año: 2022,
      precio: 24000,
      calificacion: 4.8,
      imagen: "/vehiculos/208.webp",
      estado: "indisponible",
    },
  ],
};
