'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navigationbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className='flex w-screen justify-center pt-3'>
      <div className='flex w-4/5 flex-row flex-wrap justify-between '>
        <section className='flex h-auto flex-row flex-wrap items-center'>
          <Link className='nav-button' href='/'>
            Home
          </Link>

          {/* TODO: Create explore page */}
          {/* <Link className='nav-button' href='/Explore'>
            Explore
          </Link> */}

          {session ? (
            <div>
              <button
                onClick={() => {
                  router.refresh();
                  router.replace('/MyBooks');
                }}
                className='nav-button'
              >
                My Books
              </button>

              <Link className='nav-button' href='/BookEditor'>
                Create a Book
              </Link>
            </div>
          ) : undefined}
        </section>

        <section className='flex h-auto flex-row flex-wrap items-center'>
          {session ? (
            <button
              className='m-3 rounded-full border-2 border-slate-300 px-4 py-2
                        hover:scale-105 hover:bg-slate-700'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </button>
          ) : undefined}

          {!session ? (
            <div>
              <Link
                className='m-3 rounded-full border-2 border-slate-300 px-4 py-2
                        hover:scale-105 hover:bg-slate-700'
                href='/LogIn'
              >
                Log In
              </Link>
              <Link
                className='m-3 rounded-full border-4 border-slate-200 bg-slate-200 px-4 py-2
                        text-black hover:scale-105 hover:border-slate-300 hover:bg-slate-300'
                href='/SignUp'
              >
                Sign Up
              </Link>
            </div>
          ) : undefined}
        </section>
      </div>
    </header>
  );
}
