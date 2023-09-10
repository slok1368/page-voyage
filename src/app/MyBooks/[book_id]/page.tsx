import RemoveBookButton from '@/components/RemoveBookButton';
import { bookFullContentJson } from '@/types';

export default async function Page({
  params,
}: {
  params: { book_id: string };
}) {
  const book_id = params.book_id;
  let bookName = 'Error getting this book';
  let bookContent = '<p>This book does not exist</p>';

  const res = await fetch(process.env.APP_URL + '/api/books/' + book_id, {
    method: 'GET',
  });

  if (res.ok) {
    const bookRes: bookFullContentJson = await res.json();
    bookName = bookRes.content.book_name;
    bookContent = bookRes.content.book_content;
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1>{bookName}</h1>
        <section className='flex h-fit justify-between gap-4'>
          <button className='rounded-lg bg-blue-300 px-3 py-2 text-black'>
            Edit
          </button>
          <RemoveBookButton bookId={book_id} />
        </section>
      </div>

      <div
        className='rounded-lg bg-gray-700 p-5'
        dangerouslySetInnerHTML={{ __html: bookContent }}
      />
    </div>
  );
}
