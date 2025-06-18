-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
