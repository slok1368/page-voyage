export default function Page({ params }: { params: { book_id: string } }) {
  return <div>My Book ID: {params.book_id}</div>;
}
