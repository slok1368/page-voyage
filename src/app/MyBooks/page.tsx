import { pool } from '@/app/api/_db';
import Link from 'next/link';
import { bookCard, bookCardsJson } from '@/types';

async function getBooks() {
  const user_id = '550e8400-e29b-41d4-a716-446655440000';
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
  return books;
}

export default async function MyBooks() {
  // let books = [];
  // const res = await fetch(process.env.APP_URL + '/api/books/', {
  //   method: 'GET',
  //   cache: 'no-store',
  // });

  // if (res.ok) {
  //   const resJson: bookCardsJson = await res.json();
  //   console.log(resJson);
  //   books = resJson.content;
  // }

  const books: bookCard[] = await getBooks();
  return (
    <main>
      <div className='flex flex-row items-baseline justify-between'>
        <h1>My Books</h1>
        <Link
          href='/BookEditor'
          className='rounded-lg border-4 bg-slate-200 p-3'
        >
          Add a book
        </Link>
      </div>
      <div className='flex flex-col items-start gap-4'>
        {books && books.length > 0 ? (
          books.map((item: bookCard, index: number) => {
            return (
              <Link
                key={index}
                href={`/MyBooks/${item.book_id}`}
                className='w-full rounded-lg border-4 bg-slate-200 p-3'
              >
                Book {index + 1}: {item.book_name}
              </Link>
            );
          })
        ) : (
          <p>No Books</p>
        )}
      </div>
    </main>
  );
}
