import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookRequestBody } from '@/types';
import { pool } from '@/app/api/_db';

export async function POST(req: NextRequest) {
  try {
    const { author_id, book_name, book_content }: CreateBookRequestBody =
      await req.json();
    console.log(req.body);

    // Generate a UUID for the new user.
    const book_id = uuidv4();
    console.log(
      'USer id, name, book id',
      author_id,
      ' ',
      book_name,
      ' ',
      book_id
    );
    await pool.query(
      'INSERT INTO books(book_id, author_id, book_name, book_content) VALUES ($1, $2, $3, $4)',
      [book_id, author_id, book_name, book_content]
    );
    await pool.query(
      'UPDATE users SET books = ARRAY_APPEND(books, $1) WHERE user_id = $2',
      [book_id, author_id]
    );
    var currentdate = new Date();
    var datetime =
      'Last Sync: ' +
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds();
    console.log('Added book: ' + book_name + ' :at ' + datetime);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000';

    const bookIdsRes = await pool.query(
      'SELECT books FROM users where user_id = $1',
      [user_id]
    );

    const bookIds = bookIdsRes.rows[0].books;

    let params = bookIds.map((item: string, idx: number) => {
      return '$' + (idx + 1);
    });

    const books = await pool.query(
      `SELECT book_id, book_name
        FROM books
        WHERE book_id IN (` +
        params.join(',') +
        `)`,
      bookIds
    );

    return NextResponse.json(books.rows);
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error when getting books',
    });
  }
}
