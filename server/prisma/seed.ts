import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { getErrorMessage } from "../src/utils/errorUtils"; 


const prisma = new PrismaClient();


async function deleteAllData(modelOrder: string[]) {
  // Delete in reverse order to avoid foreign key constraint violations
  for (const modelName of modelOrder.slice().reverse()) {
    const model = prisma[modelName as keyof typeof prisma];
    try {
      await (model as any).deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`❌ Failed to clear ${modelName}:`, error);
    }
  }
}

async function main() {
  const seedPath = path.join(__dirname, "seed");

  // Order matters: dependencies first, then dependents
  // Create independent tables first, then tables that reference them
  const modelOrder = [
    "Company", // Independent
    "User", // References Company
    "Job", // References Company (companyId)
    "Office", // references Company
    "Socials", // references Company
    "ApplicationQuestion", // references Job
    "Application", // References User and Job
    "Bookmark", // References User and Job
    "UserFollowCompany", // References User and Company
  ];

  await deleteAllData(modelOrder);

  // Seed in the correct order (dependencies first)
  for (const modelName of modelOrder) {
    const filePath = path.join(seedPath, `${modelName}.json`);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ No seed data found for ${modelName}`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    for (const item of data) {
      try {
        await (prisma[modelName as keyof typeof prisma] as any).create({
          data: item,
        });
      } catch (error) {

        console.error(
          `❌ Failed to seed ${modelName}:`,
          getErrorMessage(error)
        );
      }
    }

    console.log(`🌱 Seeded ${modelName}`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
