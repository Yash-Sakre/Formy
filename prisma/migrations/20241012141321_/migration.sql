/*
  Warnings:

  - You are about to drop the column `Content` on the `FormSubmission` table. All the data in the column will be lost.
  - Added the required column `content` to the `FormSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormSubmission" DROP COLUMN "Content",
ADD COLUMN     "content" TEXT NOT NULL;
