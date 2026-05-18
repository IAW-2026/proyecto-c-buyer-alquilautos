import { NextResponse } from "next/server";
import { sellerData } from "@/app/data/seller";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(sellerData, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
