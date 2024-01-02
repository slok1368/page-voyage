'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { CreateBookRequestBody } from '@/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const toolbarModule = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

export default function BookEditor() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  async function saveOnClick() {
    const saveBookRequest: CreateBookRequestBody = {
      bookName: name,
      bookContent: content,
    };

    const res = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(saveBookRequest),
    });

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

  return (
    <div className='mx-auto  flex w-11/12 flex-col items-center justify-center sm:w-8/12'>
      <h1>Book Editor</h1>
      <input
        maxLength={100}
        className='mb-5 w-full rounded-xl border px-4 py-5 text-3xl text-black'
        value={name}
        onChange={handleNameOnChange}
        placeholder='Title...'
      />
      {ReactQuill && (
        <ReactQuill
          theme='snow'
          value={content}
          className='w-full'
          onChange={setContent}
          modules={toolbarModule}
        />
      )}
      <button
        onClick={saveOnClick}
        className='my-5 w-1/5 rounded-md border border-orange-200 bg-orange-200'
      >
        Save
      </button>
    </div>
  );
}
