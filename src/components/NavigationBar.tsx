'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { ModeToggle } from './ui/mode-togle';

export default function Navigationbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const varient = 'ghost';

  return (
    <header className='flex w-screen justify-center pt-3'>
      <div className='flex w-4/5 flex-row flex-wrap justify-between '>
        <section className='flex h-auto flex-row flex-wrap items-center'>
          <Link className={buttonVariants({ variant: `${varient}` })} href='/'>
            Home
          </Link>

          {/* TODO: Create explore page */}
          {/* <Link className='nav-button' href='/Explore'>
            Explore
          </Link> */}

          {session ? (
            <div>
              <Button
                variant={varient}
                onClick={() => {
                  router.refresh();
                  router.replace('/MyBooks');
                }}
              >
                My Books
              </Button>

              <Link
                className={buttonVariants({ variant: `${varient}` })}
                href='/BookEditor'
              >
                Create a Book
              </Link>
            </div>
          ) : undefined}
        </section>

        <section className='flex h-auto flex-row flex-wrap items-center'>
          <ModeToggle />
          {session ? (
            <button
              className={buttonVariants({ variant: `${varient}` })}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </button>
          ) : undefined}

          {!session ? (
            <div>
              <Link
                className={buttonVariants({ variant: `${varient}` })}
                href='/LogIn'
              >
                Log In
              </Link>
              <Link
                className={buttonVariants({ variant: `${varient}` })}
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
