import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Cargamos manualmente el archivo de Next.js
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});