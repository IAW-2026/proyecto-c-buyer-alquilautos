export type SellerOwner = {
  id_propietario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  direccion: string;
  fecha_nacimiento: string;
};

export type SellerVehicle = {
  id_vehiculo: number;
  id_propietario: number;
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

export const sellerData: SellerData = {
  owners: [
    { id_propietario: 458976, nombre: "Lucia", apellido: "Benitez", email: "lucia.benitez@example.com", telefono: "+54 9 11 5555 0101", dni: "32100001", direccion: "Av. Rivadavia 1234, Buenos Aires", fecha_nacimiento: "1990-03-15" },
    { id_propietario: 458977, nombre: "Martin", apellido: "Suarez", email: "martin.suarez@example.com", telefono: "+54 9 11 5555 0102", dni: "32100002", direccion: "Calle Corrientes 567, Buenos Aires", fecha_nacimiento: "1988-07-22" },
    { id_propietario: 458978, nombre: "Camila", apellido: "Rios", email: "camila.rios@example.com", telefono: "+54 9 11 5555 0103", dni: "32100003", direccion: "Av. Santa Fe 890, Buenos Aires", fecha_nacimiento: "1995-11-08" },
    { id_propietario: 458979, nombre: "Nicolas", apellido: "Herrera", email: "nicolas.herrera@example.com", telefono: "+54 9 11 5555 0104", dni: "32100004", direccion: "Av. Callao 321, Buenos Aires", fecha_nacimiento: "1992-05-30" },
    { id_propietario: 458980, nombre: "Valentina", apellido: "Costa", email: "valentina.costa@example.com", telefono: "+54 9 11 5555 0105", dni: "32100005", direccion: "Calle Florida 654, Buenos Aires", fecha_nacimiento: "1993-09-17" },
  ],
  vehicles: [
    { id_vehiculo: 897650, id_propietario: 458976, marca: "Toyota", modelo: "Corolla", año: 2021, precio: 22000, fotos: "/vehiculos/corolla.webp", estado: "disponible" },
    { id_vehiculo: 897651, id_propietario: 458977, marca: "Ford", modelo: "Focus", año: 2019, precio: 18000, fotos: "/vehiculos/focus.webp", estado: "disponible" },
    { id_vehiculo: 897652, id_propietario: 458978, marca: "Peugeot", modelo: "208", año: 2022, precio: 24000, fotos: "/vehiculos/208.webp", estado: "disponible" },
    { id_vehiculo: 897653, id_propietario: 458979, marca: "Chevrolet", modelo: "Onix", año: 2020, precio: 19500, fotos: "/vehiculos/chevrolet-onix.webp", estado: "disponible" },
    { id_vehiculo: 897654, id_propietario: 458980, marca: "Volkswagen", modelo: "Golf", año: 2018, precio: 20500, fotos: "/vehiculos/volkswagen-golf.webp", estado: "disponible" },
    { id_vehiculo: 897655, id_propietario: 458976, marca: "Renault", modelo: "Sandero", año: 2021, precio: 17500, fotos: "/vehiculos/renault-sandero.webp", estado: "disponible" },
    { id_vehiculo: 897656, id_propietario: 458977, marca: "Honda", modelo: "Civic", año: 2020, precio: 26000, fotos: "/vehiculos/honda-civic.webp", estado: "disponible" },
    { id_vehiculo: 897657, id_propietario: 458978, marca: "Nissan", modelo: "Sentra", año: 2019, precio: 21000, fotos: "/vehiculos/nissan-sentra.webp", estado: "disponible" },
    { id_vehiculo: 897658, id_propietario: 458979, marca: "Fiat", modelo: "Cronos", año: 2022, precio: 18500, fotos: "/vehiculos/Fiat-Cronos.webp", estado: "disponible" },
    { id_vehiculo: 897659, id_propietario: 458980, marca: "Hyundai", modelo: "HB20", año: 2021, precio: 20000, fotos: "/vehiculos/hyundai-hb20.webp", estado: "disponible" },
    { id_vehiculo: 897660, id_propietario: 458976, marca: "Kia", modelo: "Rio", año: 2018, precio: 17000, fotos: "/vehiculos/kia-rio.webp", estado: "indisponible" },
    { id_vehiculo: 897661, id_propietario: 458977, marca: "Mazda", modelo: "3", año: 2020, precio: 25500, fotos: "/vehiculos/mazda-3.webp", estado: "indisponible" },
    { id_vehiculo: 897662, id_propietario: 458978, marca: "Citroen", modelo: "C3", año: 2021, precio: 19000, fotos: "/vehiculos/citroen-c3.webp", estado: "indisponible" },
    { id_vehiculo: 897663, id_propietario: 458979, marca: "Toyota", modelo: "Yaris", año: 2022, precio: 23000, fotos: "/vehiculos/toyota-yaris.webp", estado: "indisponible" },
    { id_vehiculo: 897664, id_propietario: 458980, marca: "Volkswagen", modelo: "Polo", año: 2019, precio: 19500, fotos: "/vehiculos/volkswagen-polo.webp", estado: "indisponible" },
    { id_vehiculo: 897665, id_propietario: 458976, marca: "Ford", modelo: "Fiesta", año: 2018, precio: 16000, fotos: "/vehiculos/ford-fiesta.webp", estado: "indisponible" },
    { id_vehiculo: 897666, id_propietario: 458977, marca: "Chevrolet", modelo: "Tracker", año: 2021, precio: 28000, fotos: "/vehiculos/chevrolet-tracker.webp", estado: "indisponible" },
    { id_vehiculo: 897667, id_propietario: 458978, marca: "Renault", modelo: "Duster", año: 2020, precio: 26500, fotos: "/vehiculos/renault-duster.webp", estado: "indisponible" },
    { id_vehiculo: 897668, id_propietario: 458979, marca: "Honda", modelo: "Fit", año: 2017, precio: 15000, fotos: "/vehiculos/honda-fit.webp", estado: "indisponible" },
    { id_vehiculo: 897669, id_propietario: 458980, marca: "Peugeot", modelo: "2008", año: 2022, precio: 27000, fotos: "/vehiculos/peugeot-2008.webp", estado: "indisponible" },
  ],
};