/*
  Warnings:

  - You are about to drop the column `state` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `posts` table. All the data in the column will be lost.
  - Added the required column `post_state` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_type` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countLikes` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countComments` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repost` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `originpost_id` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'foto', 'reference');

-- CreateEnum
CREATE TYPE "PostState" AS ENUM ('draft', 'published');

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "state",
DROP COLUMN "type",
ADD COLUMN     "post_state" "PostState" NOT NULL,
ADD COLUMN     "post_type" "PostType" NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "countLikes" SET NOT NULL,
ALTER COLUMN "countComments" SET NOT NULL,
ALTER COLUMN "repost" SET NOT NULL,
ALTER COLUMN "originpost_id" SET NOT NULL,
ALTER COLUMN "video" DROP NOT NULL,
ALTER COLUMN "announcement" DROP NOT NULL,
ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "author" DROP NOT NULL;
