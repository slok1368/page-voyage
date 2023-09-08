'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { CreateBookRequestBody } from '@/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BookEditor() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  async function saveOnClick() {
    const saveBookRequest: CreateBookRequestBody = {
      author_id: '550e8400-e29b-41d4-a716-446655440000',
      book_name: name,
      book_content: content,
    };
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveBookRequest),
    };
    const res = await fetch('/api/books', requestOption);

    if (res.ok) {
      toast.success('Created Book', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      const resJson = await res.json();
      router.push('/MyBooks/' + resJson.content);
    } else {
      toast.error('Failed to create book', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  function handleNameOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function notify() {
    toast.success('Success Notification !', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  return (
    <div className='flex  flex-col items-center justify-center'>
      <h1>Book Editor</h1>
      <input
        maxLength={100}
        className='mb-5 w-full rounded-xl border px-4 py-5 text-3xl'
        value={name}
        onChange={handleNameOnChange}
      />
      {ReactQuill && (
        <ReactQuill
          theme='snow'
          value={content}
          className='min-h-[260px] w-full'
          onChange={setContent}
        />
      )}
      <button
        onClick={saveOnClick}
        className='my-5 w-1/5 rounded-md border border-orange-200 bg-orange-200'
      >
        Save
      </button>
      <button onClick={notify}>Notify !</button>;
    </div>
  );
}
