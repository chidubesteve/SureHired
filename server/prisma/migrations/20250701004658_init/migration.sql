/*
  Warnings:

  - You are about to drop the column `applicationMethods` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "applicationMethods",
ADD COLUMN     "applicationMethod" "ApplicationMethods" NOT NULL DEFAULT 'In-app';
