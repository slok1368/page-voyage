import prisma from '@/app/api/_db';
export async function getBook(bookId: string) {
  try {
    const book = await prisma.bookVersion.findFirst({
      where: {
        bookId: bookId,
      },
      orderBy: {
        dateModified: 'desc',
      },
      select: {
        bookName: true,
        bookContent: true,
      },
    });
    return book;
  } catch (error) {
    console.log(
      'Internal server error when getting book with book_id: ' + bookId
    );
  }
}
