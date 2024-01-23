'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import { TrashIcon } from '@radix-ui/react-icons';

export default function Page({ bookId }: { bookId: string }) {
  // const session = await getServerSession(authOptions);
  const router = useRouter();

  async function deleteBook() {
    const res = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Book deleted', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      router.replace('/MyBooks');
      router.refresh();
    } else {
      toast.error('Unable to delete book', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  return (
    // <button
    //   className='rounded-lg bg-red-300 px-3 py-2 text-black'
    //   onClick={deleteBook}
    // >
    //   Delete
    // </button>

    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant='destructive'> */}
        {/* <TrashIcon className='h-6 w-6'></TrashIcon>
         */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                  <TrashIcon className='h-6 w-6' />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* </Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your book
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBook}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
