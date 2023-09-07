import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/app/api/_db';

export async function GET(
  request: Request,
  { params }: { params: { book_id: string } }
) {
  const bookId = params.book_id;

  try {
    const bookRes = await pool.query(
      'SELECT book_name, book_content FROM books where book_id = $1',
      [bookId]
    );

    const book = bookRes.rows[0];

    console.log(book);
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({
      message:
        'Internal server error when getting book with book_id: ' + bookId,
    });
  }
}
