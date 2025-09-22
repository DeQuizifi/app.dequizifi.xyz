import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
