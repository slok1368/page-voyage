import Link from 'next/link';

export default async function MyBooks() {
  return (
    <main>
      <div className='flex  flex-row items-baseline justify-between'>
        <h1>My Books</h1>
        <Link
          href='/BookEditor'
          className='rounded-lg border-4 bg-slate-200 p-3'
        >
          Add a book
        </Link>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.bookContent }}></div>
      <div>{/* Grid style books */}</div>
    </main>
  );
}
