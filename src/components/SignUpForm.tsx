'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { GoogleSignIn } from './SignInProvider';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignUpForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/createUser`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        toast.success(`Signed Up as ${username}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });

        // Sign in the user.
        signIn('credentials', {
          redirect: false,
          email,
          password,
        }).then((res) => {
          if (res?.error === null) {
            toast.success('Log in successfully', {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            router.push('/');
          } else {
            toast.error('Failed to Log in', {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        });

        router.push('/MyBooks');
      } else if (res.status === 400) {
        toast.error('Email already has an account', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error('Failed to Sign Up', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex max-w-md flex-col items-center justify-center rounded-2xl'
    >
      <div className='flex flex-col py-3'>
        <label>Username: </label>
        <input
          className='rounded-md border border-slate-400 px-2'
          type='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='flex flex-col py-3'>
        <label className=''>Email: </label>
        <input
          className='rounded-md border border-slate-400 px-2'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='flex flex-col py-3'>
        <label>Password: </label>
        <input
          className='rounded-md border border-slate-400 px-2'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='mt-6 w-full rounded-lg bg-red-400 p-2 shadow-md'
        type='submit'
      >
        Sign Up
      </button>

      <div className='flex w-full flex-row justify-between'>
        <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
        <p className='mb-4 mt-5 text-sm'>or</p>
        <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
      </div>
      <GoogleSignIn text={'Sign up with Google'} />
    </form>
  );
}
