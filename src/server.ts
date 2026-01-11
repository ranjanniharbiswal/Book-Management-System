import dotenv from 'dotenv';
import app from './app';
import prisma from './config/prisma';

dotenv.config();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} !!`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'} !!`);
});

const shutdown = async (signal: string) => {
  console.log(`${signal} received, shutting down gracefully`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
