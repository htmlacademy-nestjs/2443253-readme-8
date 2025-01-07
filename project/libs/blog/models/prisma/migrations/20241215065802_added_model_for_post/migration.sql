-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "tegs" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "countLikes" INTEGER NOT NULL,
    "countComments" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "repost" BOOLEAN NOT NULL,
    "originPostId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");
