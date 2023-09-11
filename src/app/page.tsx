import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className='z-10 w-full'>
      <h1>Page Voyage</h1>
    </main>
  );
}
