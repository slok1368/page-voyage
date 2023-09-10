import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/app/api/_db';

export async function GET(
  request: NextRequest,
  { params }: { params: { book_id: string } }
) {
  const bookId = params.book_id;

  try {
    const bookRes = await pool.query(
      'SELECT book_name, book_content FROM books where book_id = $1',
      [bookId]
    );

    const book = bookRes.rows[0];

    return NextResponse.json({ success: true, content: book });
  } catch (error) {
    console.log(
      'Internal server error when getting book with book_id: ' + bookId
    );
    return NextResponse.error();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { book_id: string } }
) {
  const bookId = params.book_id;

  try {
    const authorIdRes = await pool.query(
      'SELECT author_id FROM books where book_id = $1',
      [bookId]
    );
    const authorId = authorIdRes.rows[0].author_id;

    const authorBooksRes = await pool.query(
      'SELECT books FROM users where user_id = $1',
      [authorId]
    );

    const authorBooks: string[] = authorBooksRes.rows[0].books;
    const updatedAuthorBooks = authorBooks.filter((id) => id !== bookId);

    await pool.query('UPDATE users SET books = $1 WHERE user_id = $2', [
      updatedAuthorBooks,
      authorId,
    ]);

    await pool.query('DELETE FROM books WHERE book_id = $1', [bookId]);
    console.log('Successfully deleted book: ' + bookId);
    return NextResponse.json({
      success: true,
      message: 'Successfully deleted book: ' + bookId,
    });
  } catch (error) {
    console.log(
      'Internal server error when deleting book with book_id: ' + bookId
    );
    return NextResponse.error();
  }
}
