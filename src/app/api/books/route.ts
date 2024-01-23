import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/_db';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookRequestBody } from '@/types';
import { bookCard } from '@/types';
import { authOptions } from '../auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';
import { getBooks } from './utils';

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

    return NextResponse.json({ success: true, content: bookId });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.error();
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
