import { bookFullContentJson, bookFullContent } from '@/types';

export default async function Page({
  params,
}: {
  params: { book_id: string };
}) {
  const book_id = params.book_id;
  let bookName = '';
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
      <h1>{bookName}</h1>
      <p>My Book ID: {params.book_id}</p>
      <div dangerouslySetInnerHTML={{ __html: bookContent }} />
    </div>
  );
}
