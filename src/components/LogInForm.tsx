'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { GoogleSignIn } from './SignInProvider';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LogInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
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
    } catch (error) {
      // Handle any unexpected errors
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex max-w-md flex-col items-center justify-center rounded-2xl'
    >
      <div className='flex flex-col py-3'>
        <label>Email: </label>
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
        Log In
      </button>

      <div className='flex w-full flex-row justify-between'>
        <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
        <p className='mb-4 mt-5 text-sm'>or</p>
        <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
      </div>
      <GoogleSignIn text={'Sign in with Google'} />
    </form>
  );
}
