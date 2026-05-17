import { headers } from "next/headers";
import { Webhook } from "svix";
import { bd } from "@/lib/bd";
import type { WebhookEvent } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
  }

  const payload = await req.text();
  const headerList = await headers();
  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const webhook = new Webhook(secret);
  let event: WebhookEvent;

  try {
    event = webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = event.data;
    const email = email_addresses?.[0]?.email_address;

    if (!email) {
      return new Response("Missing user email", { status: 400 });
    }

    await bd.user.create({
      data: {
        id,
        email,
        nombre: first_name ?? null,
        apellido: last_name ?? null,
      },
    });
  }

  return new Response("ok", { status: 200 });
}
