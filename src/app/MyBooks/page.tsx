import Link from 'next/link';

export default async function MyBooks() {
  //console.log('called books API');
  let html = 'No books';
  try {
    const res = await fetch('http://localhost:3000/api/books/', {
      method: 'GET',
    });

    const data = await res.json();
    console.log(data);
    if (data) {
      html = data;
    }
  } catch {
    console.log('Failed to get books');
  }

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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
