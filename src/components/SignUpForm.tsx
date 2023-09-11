'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { toast } from 'react-toastify';
import { GoogleSignIn } from './SignInProvider';

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
      toast.success('Signed Up as ' + username, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (error) {
      console.error('Error creating user');
      // Handle the error, show an error message, etc.
      toast.error('Error creating user', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
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
        <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
        <p className='mb-4 mt-5 text-sm'>or</p>
        <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
      </div>
      <GoogleSignIn text={'Sign up with Google'} />
    </form>
  );
}
