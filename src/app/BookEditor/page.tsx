'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { CreateBookRequestBody } from '@/types';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BookEditor() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  console.log('In Book editor');
  async function saveOnClick() {
    console.log('Saving book..');
    try {
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
      await fetch('/api/books', requestOption);
      console.log('Book created:', name);
    } catch (error) {
      console.log();
    }
  }

  function handleNameOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
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
    </div>
  );
}
