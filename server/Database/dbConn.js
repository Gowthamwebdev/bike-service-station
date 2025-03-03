import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dbConn = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully...");
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1); 
  }
};

export { prisma, dbConn };
