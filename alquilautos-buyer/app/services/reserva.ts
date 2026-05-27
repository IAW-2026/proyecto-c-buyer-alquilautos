import { reservasMock, type Reserva } from "@/app/data/reservas";

export async function getReservaById(id: number): Promise<Reserva | null> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/${id}`);
  // return res.json();
  return reservasMock.find((r) => r.id_reserva === id) ?? null;
}

export async function getReservasByAlquilador(idAlquilador: string): Promise<Reserva[]> {
  // TODO: const res = await fetch(`${process.env.SELLER_APP_URL}/api/reserva/alquilador/${idAlquilador}`);
  // return res.json();
  return reservasMock.filter((r) => r.id_alquilador === idAlquilador);
}

export async function getTodasLasReservas(): Promise<Reserva[]> {
  // TODO: eliminar cuando haya integración real
  return reservasMock;
}