import Link from 'next/link';
import { bookCard } from '@/types';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getBooks } from '@/app/api/books/route';
export default async function MyBooks() {
  const session = await getServerSession(authOptions);
  let books: bookCard[] = session ? await getBooks(session.user.id) : [];

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
            href={`/MyBooks/${item.bookId}`}
            className='w-full rounded-lg bg-slate-400 p-3 text-black'
          >
            Book {index + 1}: {item.bookName}
          </Link>
        );
      })
    ) : (
      <p>No Books</p>
    );
  }

  return (
    <main className='mx-auto w-11/12 sm:w-8/12'>
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
