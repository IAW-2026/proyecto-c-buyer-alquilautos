import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var bd: PrismaClient | undefined;
}

export const bd = global.bd ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.bd = bd;
}
