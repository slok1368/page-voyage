'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navigationbar() {
  const [searchText, setSearchText] = useState('');
  const rounter = useRouter();
  console.log('Navigation rerendered');
  return (
    <div className='absolute top-0 flex w-full justify-center bg-slate-100'>
      <div className='flex w-4/5 flex-row justify-between'>
        <div className='flex flex-row justify-start'>
          <button
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            onClick={() => {
              console.log('to home');
              rounter.push('/');
            }}
          >
            Home
          </button>

          <button
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            onClick={() => {
              rounter.push('/MyBooks');
            }}
          >
            My Books
          </button>

          <button
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            onClick={() => {
              rounter.push('/Explore');
            }}
          >
            Explore
          </button>

          <button
            className='m-3 rounded-lg border-4 border-slate-100 px-4 py-2
                         hover:bg-slate-200'
            onClick={() => {
              rounter.push('/BookEditor');
            }}
          >
            Create Book
          </button>
        </div>
        <div className='flex flex-row justify-between '>
          <form className='mt-2'>
            <input
              placeholder='Search'
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className='m-5  rounded-lg border-2 border-slate-200 px-2'
            />
          </form>
          <button
            className='m-3 rounded-lg border-2 border-slate-300 px-4 py-2
                         hover:bg-slate-300'
            onClick={() => {
              rounter.push('/LogIn');
            }}
          >
            Log In
          </button>
          <button
            className='m-3 rounded-lg border-4 border-slate-200 bg-slate-200 px-4 py-2
                         hover:border-slate-300 hover:bg-slate-300'
            onClick={() => {
              rounter.push('/SignUp');
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
