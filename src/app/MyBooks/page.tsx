import Link from 'next/link';
import { bookCard, bookCardsJson } from '@/types';

export default async function MyBooks() {
  let books = [];
  const res = await fetch(process.env.APP_URL + '/api/books/', {
    method: 'GET',
    cache: 'no-store',
  });

  if (res.ok) {
    const resJson: bookCardsJson = await res.json();
    console.log(resJson);
    books = resJson.content;
  }

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
        {books.length > 0 ? (
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
