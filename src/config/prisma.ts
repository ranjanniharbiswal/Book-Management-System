import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalPrisma = globalThis as {
  prisma?: PrismaClient;
};

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prismaAdapter = new PrismaPg(pgPool);

const prisma =
  globalPrisma.prisma ??
  new PrismaClient({
    adapter: prismaAdapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['error', 'warn']
        : ['error'],
  });

  

if (process.env.NODE_ENV !== 'production') {
  globalPrisma.prisma = prisma;
}



export default prisma;
