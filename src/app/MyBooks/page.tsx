import Link from 'next/link';
import { bookCard } from '@/types';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';
import { getBooks } from '@/app/api/books/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlusIcon } from '@radix-ui/react-icons';
import { redirect, useRouter } from 'next/navigation';

export default async function MyBooks() {
  const session = await getServerSession(authOptions);
  let books: bookCard[] = session ? await getBooks(session.user.id) : [];

  if (!session) {
    redirect('/SignUp');
  }

  function bookList() {
    return books && books.length > 0 ? (
      books.map((item: bookCard, index: number) => {
        // Check if item is undefined, and skip it if it is
        if (!item) {
          return null; // Skip this iteration
        }

        return (
          <Link
            key={index}
            href={`/MyBooks/${item.bookId}`}
            className='w-full rounded-lg bg-primary p-3 text-secondary hover:bg-primary/90'
          >
            Book {index + 1}: {item.bookName}
          </Link>
        );
      })
    ) : (
      <p>Click the &apos;+&apos; button to add a new book.</p>
    );
  }

  return (
    <main className='mx-auto w-11/12 sm:w-8/12'>
      <div className='flex flex-row items-baseline justify-between'>
        <h2 className='mb-6 scroll-m-20 border-b-2 border-foreground pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
          My Books
        </h2>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/BookEditor'
                className={buttonVariants({ variant: 'default' })}
              >
                <PlusIcon className='h-6 w-6' />
              </Link>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Add a new book</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='flex flex-grow flex-col items-start gap-4'>
        {session ? bookList() : <p>Please sign in first</p>}
      </div>
    </main>
  );
}
