/*
  Warnings:

  - The values [In-app] on the enum `ApplicationMethods` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationMethods_new" AS ENUM ('In_app', 'External');
ALTER TABLE "Job" ALTER COLUMN "applicationMethod" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "applicationMethod" TYPE "ApplicationMethods_new" USING ("applicationMethod"::text::"ApplicationMethods_new");
ALTER TYPE "ApplicationMethods" RENAME TO "ApplicationMethods_old";
ALTER TYPE "ApplicationMethods_new" RENAME TO "ApplicationMethods";
DROP TYPE "ApplicationMethods_old";
ALTER TABLE "Job" ALTER COLUMN "applicationMethod" SET DEFAULT 'In_app';
COMMIT;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "applicationMethod" SET DEFAULT 'In_app';
