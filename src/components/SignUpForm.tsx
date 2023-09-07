'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/createUser', {
        username,
        email,
        password,
      });

      console.log('User created:', response.data.message);
      // You can also navigate to a new page or show a success message
    } catch (error) {
      console.error('Error creating user');
      // Handle the error, show an error message, etc.
    }
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
        <span className='mt-8 h-[1px] w-3/12 bg-slate-400'></span>
        <p className='mb-4 mt-5 text-sm'>or Sign In using</p>
        <span className='mt-8 h-[1px] w-3/12 bg-slate-400'></span>
      </div>
      <button
        type='button'
        className=' mb-2 flex w-auto flex-row  justify-center rounded-xl border border-slate-300 py-2.5 pl-12 pr-16 text-black shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'
      >
        <div className='mr-3 mt-1'>
          <svg aria-hidden='true' width='18' height='18' viewBox='0 0 18 18'>
            <path
              fill='#4285F4'
              d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z'
            ></path>
            <path
              fill='#34A853'
              d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z'
            ></path>
            <path
              fill='#FBBC05'
              d='M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z'
            ></path>
            <path
              fill='#EA4335'
              d='M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z'
            ></path>
          </svg>
        </div>
        Sign in with Google
      </button>
    </form>
  );
}
