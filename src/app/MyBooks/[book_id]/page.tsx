export default async function Page({
  params,
}: {
  params: { book_id: string };
}) {
  const book_id = params.book_id;
  const data = await fetch(process.env.APP_URL + '/api/books/' + book_id, {
    method: 'GET',
  });

  const book = await data.json();
  return (
    <div>
      <h1>{book.book_name}</h1>
      <p>My Book ID: {params.book_id}</p>
      <div dangerouslySetInnerHTML={{ __html: book.book_content }} />
    </div>
  );
}
