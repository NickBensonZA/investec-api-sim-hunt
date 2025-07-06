import { PrismaClient } from '@prisma/client'

const options = process.env.DATABASE_URL
  ? { datasources: { db: { url: process.env.DATABASE_URL } } }
  : {}

export const prisma = new PrismaClient(options)

process.on('SIGTERM', async () => {
  await prisma.$disconnect()
})
process.on('SIGINT', async () => {
  await prisma.$disconnect()
})
