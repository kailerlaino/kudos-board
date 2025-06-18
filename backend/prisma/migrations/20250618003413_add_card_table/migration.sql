-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "board_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "gifUrl" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
