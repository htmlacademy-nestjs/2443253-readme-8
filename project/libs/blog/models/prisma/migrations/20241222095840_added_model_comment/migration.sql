-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "countLikes" DROP NOT NULL,
ALTER COLUMN "countComments" DROP NOT NULL,
ALTER COLUMN "originpost_id" DROP NOT NULL;
