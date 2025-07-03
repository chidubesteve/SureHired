import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";


const prisma = new PrismaClient();

async function deleteAllData(modelOrder: string[]) {
  for (const modelName of modelOrder) {
    const model = prisma[modelName as keyof typeof prisma];
    try {
      await (model as any).deleteMany({});
    } catch (error) {
      console.error(`❌ Failed to clear ${modelName}:`, error)
    }
  }
}

async function main() {
    console.log(__dirname);
    const seedPath = path.join(__dirname, "seed");
    console.log(seedPath);

  // Order matters: dependencies first, then dependents
  const modelOrder = [
    "Application",
    "Bookmark",
    "ApplicationQuestion",
    "Job",
    "Office",
    "Socials",
    "Company",
    "User",
  ];

  await deleteAllData(modelOrder);

  for (const modelName of modelOrder.reverse()) {
    const filePath = path.join(seedPath, `${modelName}.json`);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ No seed data found for ${modelName}`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    for (const item of data) {
      try {
        if (modelName === "Job" && item.applicationQuestions) {
          if (item.applicationQuestions.length > 0) {
            item.applicationQuestions = {
              create: item.applicationQuestions.map((q: any) => ({
                ...q,
              })),
            };
          } else {
            delete item.applicationQuestions; // clean empty arrays
          }
        }
          await (prisma[modelName as keyof typeof prisma] as any).create({
            data: item,
          });
      } catch (error) {
        function getErrorMessage(error: unknown) {
          if (error instanceof Error) return error.message;
          return String(error);
        }
        console.error(`❌ Failed to seed ${modelName}:`, getErrorMessage(error));
      }
    }

    console.log(`🌱 Seeded ${modelName}`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
