import NavigationBar from '@/components/NavigationBar';

export default function Home() {
  return (
    // <main className='flex h-screen flex-col'>
    //   <NavigationBar />
    // </main>

    <main className='z-10 w-full'>
      <h1>Home page</h1>
      <h1>{process.env.ENV_TEST}</h1>
    </main>
  );
}
