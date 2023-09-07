import Link from 'next/link';

type bookCard = {
  book_id: string;
  book_name: string;
};

export default async function MyBooks() {
  const res = await fetch(process.env.APP_URL + '/api/books/', {
    method: 'GET',
    cache: 'no-store',
  });

  const data: bookCard[] = await res.json();
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
        {data.map((item: bookCard, index: number) => {
          return (
            <Link
              key={index}
              href={`/MyBooks/${item.book_id}`}
              className='w-full rounded-lg border-4 bg-slate-200 p-3'
            >
              Book {index + 1}: {item.book_name}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
