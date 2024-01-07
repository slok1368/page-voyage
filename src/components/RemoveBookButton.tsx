'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default async function Page({ bookId }: { bookId: string }) {
  const router = useRouter();

  async function deleteBook() {
    const res = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Book deleted', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      router.refresh();
      router.replace('/MyBooks');
    } else {
      toast.error('Unable to delete book', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  return (
    <button
      className='rounded-lg bg-red-300 px-3 py-2 text-black'
      onClick={deleteBook}
    >
      Delete
    </button>
  );
}
