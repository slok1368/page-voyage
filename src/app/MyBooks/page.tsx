import { pool } from '@/app/api/_db';
import Link from 'next/link';
import { bookCard } from '@/types';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function MyBooks() {
  const session = await getServerSession(authOptions);
  console.log(session);
  let books: bookCard[] = session ? await getBooks(session.user.id) : [];

  async function getBooks(userId: string) {
    'use server';
    console.log('The user id is:' + userId);

    const bookIdsRes = await pool.query(
      'SELECT books FROM users where user_id = $1',
      [userId]
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

  function bookList() {
    return books && books.length > 0 ? (
      books.map((item: bookCard, index: number) => {
        // Check if item is undefined, and skip it if it is
        if (!item) {
          return null; // Skip this iteration
        }

        return (
          <Link
            key={index}
            href={`/MyBooks/${item.book_id}`}
            className='w-full rounded-lg bg-slate-400 p-3 text-black'
          >
            Book {index + 1}: {item.book_name}
          </Link>
        );
      })
    ) : (
      <p>No Books</p>
    );
  }

  return (
    <main>
      <div className='flex flex-row items-baseline justify-between'>
        <h1>My Books</h1>
        <Link
          href='/BookEditor'
          className='rounded-lg border-4 bg-slate-200 p-3 text-black'
        >
          Add a book
        </Link>
      </div>
      <div className='flex flex-col items-start gap-4'>
        {session ? bookList() : <p>Please sign in first</p>}
      </div>
    </main>
  );
}
