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
  location: string;
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
      location: "CABA",
      calificacion: 4.6,
      imagen: "/vehicles/corolla.jpg",
      estado: "disponible",
    },
    {
      id: 897655,
      id_propietario: 458976,
      marca: "Ford",
      modelo: "Focus",
      año: 2019,
      precio: 18000,
      location: "CABA",
      calificacion: 4.3,
      imagen: "/vehicles/focus.jpg",
      estado: "disponible",
    },
    {
      id: 897656,
      id_propietario: 458976,
      marca: "Peugeot",
      modelo: "208",
      año: 2022,
      precio: 24000,
      location: "San Isidro",
      calificacion: 4.8,
      imagen: "/vehicles/208.jpg",
      estado: "indisponible",
    },
  ],
};
