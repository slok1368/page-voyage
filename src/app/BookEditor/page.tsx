'use client';
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

export default function BookEditor() {
  const [value, setValue] = useState('');

  const ReactQuill = dynamic(() => import('react-quill'), {
    loading: () => <p>loading...</p>,
    ssr: false,
  });

  function saveOnClick() {
    console.log('Clicked');
    console.log(value);
    setValue(value);
  }

  return (
    <div>
      <h1>Book Editor</h1>
      <ReactQuill theme='snow' value={value} onChange={setValue} />
      <button onClick={saveOnClick}>Save</button>
    </div>
  );
}
