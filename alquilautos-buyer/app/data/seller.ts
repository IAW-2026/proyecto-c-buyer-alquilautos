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
  id: number;
  id_propietario: number;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  imagen: string;
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
    { id: 897650, id_propietario: 458976, marca: "Toyota", modelo: "Corolla", año: 2021, precio: 22000, imagen: "/vehiculos/corolla.webp", estado: "disponible" },
    { id: 897651, id_propietario: 458977, marca: "Ford", modelo: "Focus", año: 2019, precio: 18000, imagen: "/vehiculos/focus.webp", estado: "disponible" },
    { id: 897652, id_propietario: 458978, marca: "Peugeot", modelo: "208", año: 2022, precio: 24000, imagen: "/vehiculos/208.webp", estado: "disponible" },
    { id: 897653, id_propietario: 458979, marca: "Chevrolet", modelo: "Onix", año: 2020, precio: 19500, imagen: "/vehiculos/chevrolet-onix.webp", estado: "disponible" },
    { id: 897654, id_propietario: 458980, marca: "Volkswagen", modelo: "Golf", año: 2018, precio: 20500, imagen: "/vehiculos/volkswagen-golf.webp", estado: "disponible" },
    { id: 897655, id_propietario: 458976, marca: "Renault", modelo: "Sandero", año: 2021, precio: 17500, imagen: "/vehiculos/renault-sandero.webp", estado: "disponible" },
    { id: 897656, id_propietario: 458977, marca: "Honda", modelo: "Civic", año: 2020, precio: 26000, imagen: "/vehiculos/honda-civic.webp", estado: "disponible" },
    { id: 897657, id_propietario: 458978, marca: "Nissan", modelo: "Sentra", año: 2019, precio: 21000, imagen: "/vehiculos/nissan-sentra.webp", estado: "disponible" },
    { id: 897658, id_propietario: 458979, marca: "Fiat", modelo: "Cronos", año: 2022, precio: 18500, imagen: "/vehiculos/fiat-cronos.webp", estado: "disponible" },
    { id: 897659, id_propietario: 458980, marca: "Hyundai", modelo: "HB20", año: 2021, precio: 20000, imagen: "/vehiculos/hyundai-hb20.webp", estado: "disponible" },
    { id: 897660, id_propietario: 458976, marca: "Kia", modelo: "Rio", año: 2018, precio: 17000, imagen: "/vehiculos/kia-rio.webp", estado: "indisponible" },
    { id: 897661, id_propietario: 458977, marca: "Mazda", modelo: "3", año: 2020, precio: 25500, imagen: "/vehiculos/mazda-3.webp", estado: "indisponible" },
    { id: 897662, id_propietario: 458978, marca: "Citroen", modelo: "C3", año: 2021, precio: 19000, imagen: "/vehiculos/citroen-c3.webp", estado: "indisponible" },
    { id: 897663, id_propietario: 458979, marca: "Toyota", modelo: "Yaris", año: 2022, precio: 23000, imagen: "/vehiculos/toyota-yaris.webp", estado: "indisponible" },
    { id: 897664, id_propietario: 458980, marca: "Volkswagen", modelo: "Polo", año: 2019, precio: 19500, imagen: "/vehiculos/volkswagen-polo.webp", estado: "indisponible" },
    { id: 897665, id_propietario: 458976, marca: "Ford", modelo: "Fiesta", año: 2018, precio: 16000, imagen: "/vehiculos/ford-fiesta.webp", estado: "indisponible" },
    { id: 897666, id_propietario: 458977, marca: "Chevrolet", modelo: "Tracker", año: 2021, precio: 28000, imagen: "/vehiculos/chevrolet-tracker.webp", estado: "indisponible" },
    { id: 897667, id_propietario: 458978, marca: "Renault", modelo: "Duster", año: 2020, precio: 26500, imagen: "/vehiculos/renault-duster.webp", estado: "indisponible" },
    { id: 897668, id_propietario: 458979, marca: "Honda", modelo: "Fit", año: 2017, precio: 15000, imagen: "/vehiculos/honda-fit.webp", estado: "indisponible" },
    { id: 897669, id_propietario: 458980, marca: "Peugeot", modelo: "2008", año: 2022, precio: 27000, imagen: "/vehiculos/peugeot-2008.webp", estado: "indisponible" },
  ],
};