import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className='flex flex-col items-center'>
      <div
        className=' flex h-[70vh] w-screen flex-col items-center gap-5 bg-slate-500'
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="88" height="24" viewBox="0 0 88 24"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="autumn" fill="%23487500" fill-opacity="0.5"%3E%3Cpath d="M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.30 2.18v10.58L73.53 0H78z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      >
        <h1 className='text-8xl italic'>Page Voyage</h1>
        <div className='text-slate-800'>
          {session?.user ? (
            <h2>Enjoy your stories!</h2>
          ) : (
            <h2>Please Log In!</h2>
          )}
        </div>

        <p>
          Upload your stories, store them, and choose a voice to read the story
          out for you!
        </p>

        <p className='font-bold'>
          Basic Funtionalities:
          <ul className='font-normal'>
            <li>Create account/ Log in ✅</li>
            <li>Create and save stories ✅</li>
            <li>Show stories for the user ✅</li>
            <li>Delete stories ✅</li>
            <li>Read-A-Loud ✅</li>
            <li>Edit stories</li>
          </ul>
        </p>

        <p>
          ** Recommend using Microsoft Edge on Desktop for more neural voices**
        </p>
      </div>
    </main>
  );
}
