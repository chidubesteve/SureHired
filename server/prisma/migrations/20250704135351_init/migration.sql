/*
  Warnings:

  - You are about to drop the `_UserFollowsCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFollowsCompany" DROP CONSTRAINT "_UserFollowsCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFollowsCompany" DROP CONSTRAINT "_UserFollowsCompany_B_fkey";

-- DropTable
DROP TABLE "_UserFollowsCompany";

-- CreateTable
CREATE TABLE "UserFollowCompany" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFollowCompany_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFollowCompany_userId_companyId_key" ON "UserFollowCompany"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "UserFollowCompany" ADD CONSTRAINT "UserFollowCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowCompany" ADD CONSTRAINT "UserFollowCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
