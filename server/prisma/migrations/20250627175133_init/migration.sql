/*
  Warnings:

  - The values [IN_APP,EXTERNAL] on the enum `ApplicationMethods` will be removed. If these variants are still used in the database, this will fail.
  - The values [APPLIED,INTERVIEWING,REJECTED,HIRED,WITHDRAWN] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [OPEN,CLOSED] on the enum `JobLifeCycle` will be removed. If these variants are still used in the database, this will fail.
  - The values [TEXTAREA,SELECT,RADIO,CHECKBOX] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANDIDATE,EMPLOYER] on the enum `UserTypes` will be removed. If these variants are still used in the database, this will fail.
  - The values [REMOTE,HYBRID,ONSITE] on the enum `WorkStyles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `title` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `description` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4096)`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationMethods_new" AS ENUM ('In_app', 'External');
ALTER TABLE "Job" ALTER COLUMN "applicationMethods" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "applicationMethods" TYPE "ApplicationMethods_new" USING ("applicationMethods"::text::"ApplicationMethods_new");
ALTER TYPE "ApplicationMethods" RENAME TO "ApplicationMethods_old";
ALTER TYPE "ApplicationMethods_new" RENAME TO "ApplicationMethods";
DROP TYPE "ApplicationMethods_old";
ALTER TABLE "Job" ALTER COLUMN "applicationMethods" SET DEFAULT 'In_app';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('Applied', 'Interviewing', 'Rejected', 'Hired', 'Withdrawn');
ALTER TABLE "Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "ApplicationStatus_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'Applied';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobLifeCycle_new" AS ENUM ('Open', 'Closed');
ALTER TABLE "Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "JobLifeCycle_new" USING ("status"::text::"JobLifeCycle_new");
ALTER TYPE "JobLifeCycle" RENAME TO "JobLifeCycle_old";
ALTER TYPE "JobLifeCycle_new" RENAME TO "JobLifeCycle";
DROP TYPE "JobLifeCycle_old";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'Open';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('textarea', 'select', 'radio', 'checkbox');
ALTER TABLE "ApplicationQuestion" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserTypes_new" AS ENUM ('Candidate', 'Employer');
ALTER TABLE "User" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserTypes_new" USING ("userType"::text::"UserTypes_new");
ALTER TYPE "UserTypes" RENAME TO "UserTypes_old";
ALTER TYPE "UserTypes_new" RENAME TO "UserTypes";
DROP TYPE "UserTypes_old";
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'Candidate';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkStyles_new" AS ENUM ('Remote', 'Hybrid', 'Onsite');
ALTER TABLE "Company" ALTER COLUMN "workStyle" TYPE "WorkStyles_new" USING ("workStyle"::text::"WorkStyles_new");
ALTER TYPE "WorkStyles" RENAME TO "WorkStyles_old";
ALTER TYPE "WorkStyles_new" RENAME TO "WorkStyles";
DROP TYPE "WorkStyles_old";
COMMIT;

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'Applied';

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "title" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(4096),
ALTER COLUMN "applicationMethods" SET DEFAULT 'In_app',
ALTER COLUMN "status" SET DEFAULT 'Open';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'Candidate';
