'use client';
import { toast } from 'react-toastify';

export default function Home() {
  function notify() {
    toast.success('Success Notification !', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  return (
    <main className='z-10 w-full'>
      <h1>Home page</h1>
      <button onClick={notify}>Notify !</button>
    </main>
  );
}
