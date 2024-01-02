-- DropForeignKey
ALTER TABLE "BookVersion" DROP CONSTRAINT "BookVersion_bookId_fkey";

-- AddForeignKey
ALTER TABLE "BookVersion" ADD CONSTRAINT "BookVersion_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
