import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/_db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const bookId = params.bookId;
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
    if (book) {
      return NextResponse.json({ success: true, content: book });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.log(
      'Internal server error when getting book with book_id: ' + bookId
    );
    return NextResponse.json(
      { error: `Internal Server Error when getting book with id: ${bookId}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const session = await getServerSession(authOptions);
  const bookId = params.bookId;
  const authorId = session?.user.id;
  try {
    await prisma.book.delete({
      where: {
        id: bookId,
        authorId: authorId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(
      'Internal server error when deleting book with book_id: ' + bookId
    );
    return NextResponse.json(
      { error: `Internal Server Error when deleting book with id: ${bookId}` },
      { status: 500 }
    );
  }
}
