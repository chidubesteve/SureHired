/*
  Warnings:

  - The values [In_app] on the enum `ApplicationMethods` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `jobType` on the `Job` table. All the data in the column will be lost.
  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationMethods_new" AS ENUM ('In-app', 'External');
ALTER TABLE "Job" ALTER COLUMN "applicationMethods" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "applicationMethods" TYPE "ApplicationMethods_new" USING ("applicationMethods"::text::"ApplicationMethods_new");
ALTER TYPE "ApplicationMethods" RENAME TO "ApplicationMethods_old";
ALTER TYPE "ApplicationMethods_new" RENAME TO "ApplicationMethods";
DROP TYPE "ApplicationMethods_old";
ALTER TABLE "Job" ALTER COLUMN "applicationMethods" SET DEFAULT 'In-app';
COMMIT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "jobType",
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "applicationMethods" SET DEFAULT 'In-app';
