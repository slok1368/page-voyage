import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookRequestBody } from '@/types';
import { pool } from '@/app/api/_db';
import { bookCard } from '@/types';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

// async function checkUserID(id: string) {
//   try {
//     const checkResult = await pool.query(
//       'SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1)',
//       [id]
//     );

//     return checkResult.rows[0].exists;
//   } catch (error) {
//     return false;
//   }
// }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const { book_name, book_content }: CreateBookRequestBody = await req.json();
    const author_id = session?.user.id;
    //const userExists = await checkUserID(author_id);

    if (!author_id) {
      return NextResponse.error();
    }
    const book_id = uuidv4();
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

    return NextResponse.json({ success: true, content: book_id });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const user_id = session?.user.id;
    const bookIdsRes = await pool.query(
      'SELECT books FROM users where user_id = $1',
      [user_id]
    );

    const bookIds = bookIdsRes.rows[0].books;
    let books: bookCard[] = [];

    if (bookIds.length > 0) {
      let params = bookIds.map((item: string, idx: number) => {
        return '$' + (idx + 1);
      });

      const booksRes = await pool.query(
        `SELECT book_id, book_name
        FROM books
        WHERE book_id IN (` +
          params.join(',') +
          `)`,
        bookIds
      );

      books = booksRes.rows;
    }
    return NextResponse.json({ success: true, content: books });
  } catch (error) {
    return NextResponse.error();
  }
}
