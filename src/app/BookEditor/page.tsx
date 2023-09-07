'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
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
      await fetch(process.env.APP_URL + '/api/books', requestOption);
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
      <audio
        controls
        src='https://page-voyage-dev-books.s3.us-east-1.amazonaws.com/test-audio.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF0sRxIRGH6Rc%2BvIWgvPXS1Ny9DXSQR2%2BLFMh1JbtgaLAiAKx%2F6vaXGmsDpgzUlXYP6W2kO71DtTwSY7vGv0gWluvCrkAgh7EAAaDDIzNDU3MDEwNzE2NyIMyKDHY4nt5ewV%2FySEKsECDE3XlHVWWLUq8aetJDw7DPWQbiMStuc32WNXGgIIX3out9F5JUx6YTm%2FXKfVGJd3NMSdKkLEyuziqZRTRenoESRAvxXrGjgrHunp8j5KYNqv2S2WFZ508HB5OIphn7Ndlt5%2BHTi5XpxLGYOoyux9vV9M%2FI39Ciqy8xP07kf%2F1X8SxGY6hv3rZcwnOTYqTlodxa%2BjzHQipHqfKTYDhxiT%2BIrPOQqfsAt%2FX1e4E5AdQGG08%2BEsGM8udu%2FhXbCePu03stEf4H%2FdsGr4zHk4hPZ3RzNGYGze7iWMDgl4iLJ8psDjeCVnhJIntieZP5BPsOIfmw6dryJIHS%2FvKWX7LJzXo5bCs9cRlyTlL%2FC%2BlAprNM4cD6M1T6S0DpvLYyRWs28hbz8kwM7nkReOrhPuB7oYluD5FEREWlZoWbGDP%2FElMEhKMPz74qcGOrQCVj6%2F7EknKw5iHCHXEdPs0j9puUHaMA7kIhEOWMkIVZ%2FcZbBDAbw8wX5ViLuic8UFYZ6W95sczmRD0i9T%2FRK8bG79HZMPpU55LRvLNJXmSncaBQLztty6Tu2eadkcvUr4V0MEQUUqe1Ub4AvOOsSesR0wibYP%2BzzRc8CI9z0sDzwZ8K8Hw%2B72CbbG2PqpYs2I2BUvlS28MRfO7LO8lh4g5HRJVuqkAP5r%2FzYj2b2smV54GRsW8Y1v6ED%2BHr0UfM2IE%2FIHqCBQdT1mA0BluwrZvMupLj5ikXtwyjqMsTd%2B%2FGAONgEhHT2JUcorRdZunXKULRBnnl8lWAqO2t%2BJInCij0etX2oYXmGQHWJCi1G1LHbosti0vuagHYt35JwqXX2XCnAM%2BDPKKKodLMbbYNF3b8uZJ5k%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230906T181328Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATNHLXZEPUP3623MZ%2F20230906%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=93032dadb20d990ef5d815f013969568d3ff16ee7f55e9b98552ee891d7444f3'
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
