import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/_db';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookRequestBody } from '@/types';
import { bookCard } from '@/types';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const { bookName, bookContent }: CreateBookRequestBody = await req.json();
    const authorId = session?.user.id;

    if (!authorId) {
      return NextResponse.error();
    }

    const bookId = uuidv4();

    // Add a new book to the database
    await prisma.book.create({
      data: {
        id: bookId,
        authorId: authorId,
        versions: {
          create: [
            {
              id: uuidv4(),
              bookName: bookName,
              bookContent: bookContent,
            },
          ],
        },
      },
    });

    console.log(`Added book: ${bookName} at ${new Date().toISOString()}`);

    return NextResponse.json({ success: true, content: bookId });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.error();
  }
}

export async function getBooks(userId: string): Promise<bookCard[]> {
  try {
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
      });

    return books;
  } catch (error) {
    throw error;
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.error();
    }

    const books: bookCard[] = await getBooks(userId);

    return NextResponse.json({ success: true, content: books });
  } catch (error) {
    return NextResponse.error();
  }
}
