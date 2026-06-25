import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

declare global {
  // eslint-disable-next-line no-var
  var bd: PrismaClient | undefined;
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

export const bd = global.bd ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.bd = bd;
}