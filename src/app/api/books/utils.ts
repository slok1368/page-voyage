import prisma from '@/app/api/_db';
import { bookCard } from '@/types';

export async function getBooks(userId: string): Promise<bookCard[]> {
  const books: bookCard[] = await prisma.book
    .findMany({
      select: {
        id: true,
        versions: {
          select: {
            bookName: true,
          },
          orderBy: {
            dateModified: 'desc',
          },
        },
      },
      where: {
        authorId: userId,
      },
    })
    .then((result) => {
      return result.map((book) => ({
        bookId: book.id,
        bookName: book.versions[0].bookName,
      }));
    })
    .catch((error) => {
      throw error;
    });

  return books;
}
