import pg from '@prisma/client';

const { PrismaClient } = pg;

const client = new PrismaClient();

export default client;
