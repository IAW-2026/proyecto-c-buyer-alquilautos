import { NextResponse } from "next/server";

export async function GET() {
  // TODO: reemplazar por fetch real a la Payments App
  // const res = await fetch(`${process.env.PAYMENTS_APP_URL}/api/pago/link`);
  // return NextResponse.json(await res.json());
  return NextResponse.json({ link: "link-mercado-pago" });
}