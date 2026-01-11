import dotenv from 'dotenv';
import app from './app';
import prisma from './config/prisma';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ...`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'} ..`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully ..');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully ...');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});