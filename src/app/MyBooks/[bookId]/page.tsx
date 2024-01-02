import RemoveBookButton from '@/components/RemoveBookButton';
import SppechSynthesisComponent from '@/components/SpeechSynthesisComponent';
import { bookFullContentJson } from '@/types';

export default async function Page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  let bookName = 'Error getting this book';
  let bookContent = '<p>This book does not exist</p>';
  const res = await fetch(`${process.env.APP_URL}/api/books/${bookId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (res.ok) {
    const bookRes: bookFullContentJson = await res.json();
    bookName = bookRes.content.bookName;
    bookContent = bookRes.content.bookContent;
  }

  return (
    <div className='mx-auto w-11/12 sm:w-8/12'>
      <div className='flex items-center justify-between'>
        <h1>{bookName}</h1>
        <section className='flex h-fit justify-between gap-4'>
          {/* TODO: Add edit button */}
          {/* <button className='rounded-lg bg-blue-300 px-3 py-2 text-black'>
            Edit
          </button> */}
          <RemoveBookButton bookId={bookId} />
        </section>
      </div>
      <SppechSynthesisComponent bookName={bookName} bookContent={bookContent} />
      <div
        className='mt-3 rounded-lg bg-gray-700 p-5'
        dangerouslySetInnerHTML={{ __html: bookContent }}
      />
    </div>
  );
}
