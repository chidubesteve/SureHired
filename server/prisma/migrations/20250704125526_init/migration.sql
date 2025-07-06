/*
  Warnings:

  - The values [Candidate,Employer] on the enum `UserTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserTypes_new" AS ENUM ('CANDIDATE', 'EMPLOYER');
ALTER TABLE "User" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserTypes_new" USING ("userType"::text::"UserTypes_new");
ALTER TYPE "UserTypes" RENAME TO "UserTypes_old";
ALTER TYPE "UserTypes_new" RENAME TO "UserTypes";
DROP TYPE "UserTypes_old";
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'CANDIDATE';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'CANDIDATE';
