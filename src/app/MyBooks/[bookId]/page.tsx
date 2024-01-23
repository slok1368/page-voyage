import NeuralTTS from '@/components/NeuralTTS';
import RemoveBookButton from '@/components/RemoveBookButton';
import SpeechSynthesis from '@/components/SpeechSynthesis';
import { Voices, getVoices } from '@/lib/azure-tts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBook } from '@/app/api/books/[bookId]/utils';

export default async function Page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  let bookName = 'Error getting this book';
  let bookContent = '<p>This book does not exist</p>';
  const book = await getBook(bookId);
  if (book) {
    bookName = book.bookName;
    bookContent = book.bookContent;
  }

  const voices: Voices = await getVoices();

  return (
    <div className='mx-auto w-11/12 sm:w-8/12'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-6 scroll-m-20 border-b-2 border-foreground pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
          {bookName}
        </h2>
        <section className='flex h-fit justify-between gap-4'>
          {/* TODO: Add edit button */}
          {/* <button className='rounded-lg bg-blue-300 px-3 py-2 text-black'>
            Edit
          </button> */}
          <RemoveBookButton bookId={bookId} />
        </section>
      </div>

      <Tabs defaultValue='browser-voices' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='browser-voices'>Browser Voice</TabsTrigger>
          <TabsTrigger value='neural-audio'>Neural Audio</TabsTrigger>
        </TabsList>
        <TabsContent value='browser-voices' className='rounded-lg border-2 p-5'>
          <SpeechSynthesis content={bookName + '. ' + bookContent} />
        </TabsContent>
        <TabsContent value='neural-audio' className='rounded-lg border-2 p-5'>
          <NeuralTTS
            bookName={bookName}
            bookContent={bookContent}
            voices={voices}
          />
        </TabsContent>
      </Tabs>

      <div className='text-primary-fore mt-3 rounded-lg pt-5'>
        <p className='whitespace-pre-line'>{bookContent}</p>
      </div>
    </div>
  );
}
