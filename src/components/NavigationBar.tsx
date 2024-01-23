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

  const varient = 'link';
  const size = 'lg';

  return (
    <header className='flex w-screen justify-center pt-3'>
      <div className='flex w-4/5 flex-row flex-wrap justify-between '>
        <section className='flex h-auto flex-row flex-wrap items-center'>
          <Link
            className={buttonVariants({ variant: `${varient}`, size: `lg` })}
            href='/'
          >
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
                size={size}
                onClick={() => {
                  router.replace('/MyBooks');
                  router.refresh();
                }}
              >
                My Books
              </Button>

              <Link
                className={buttonVariants({
                  variant: `${varient}`,
                  size: `lg`,
                })}
                href='/BookEditor'
              >
                Create a Book
              </Link>

              <Link
                className={buttonVariants({
                  variant: `${varient}`,
                  size: `lg`,
                })}
                href='/playground'
              >
                Playground
              </Link>
            </div>
          ) : undefined}
        </section>

        <section className='flex h-auto flex-row flex-wrap items-center'>
          <ModeToggle />
          {session ? (
            <button
              className={buttonVariants({ variant: `${varient}`, size: `lg` })}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </button>
          ) : undefined}

          {!session ? (
            <div>
              <Link
                className={buttonVariants({
                  variant: `${varient}`,
                  size: `lg`,
                })}
                href='/LogIn'
              >
                Log In
              </Link>
              <Link
                className={buttonVariants({
                  variant: `${varient}`,
                  size: `lg`,
                })}
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
