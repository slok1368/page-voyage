'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navigationbar() {
  const rounter = useRouter();

  return (
    <header className='flex w-screen justify-center bg-slate-100'>
      <div className='flex w-4/5 flex-row flex-wrap justify-between'>
        <section className='flex flex-row flex-wrap justify-start'>
          <Link
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            href='/'
          >
            Home
          </Link>

          <Link
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            href='/MyBooks'
          >
            My Books
          </Link>

          <Link
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            href='/Explore'
          >
            Explore
          </Link>

          <Link
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            href='/BookEditor'
          >
            Create Book
          </Link>
        </section>

        <section className='flex flex-row justify-between '>
          <Link
            className='m-3 rounded-lg border-2 border-slate-300 px-4 py-2
                        hover:bg-slate-300'
            href='/LogIn'
          >
            Log In
          </Link>
          <Link
            className='m-3 rounded-lg border-4 border-slate-200 bg-slate-200 px-4 py-2
                        hover:border-slate-300 hover:bg-slate-300'
            href='/SignUp'
          >
            Sign Up
          </Link>
        </section>
      </div>
    </header>
  );
}
