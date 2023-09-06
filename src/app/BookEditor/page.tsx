'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { CreateBookRequestBody } from '@/types';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BookEditor() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  async function saveOnClick() {
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

  function handleNameOnChange(event) {
    setName(event.target.value);
  }

  return (
    <div className='flex w-full flex-col justify-center'>
      <h1>Book Editor</h1>
      <input
        className='w-full border'
        value={name}
        onChange={handleNameOnChange}
      />
      {ReactQuill && (
        <ReactQuill theme='snow' value={content} onChange={setContent} />
      )}
      <button onClick={saveOnClick}>Save</button>
    </div>
  );
}
