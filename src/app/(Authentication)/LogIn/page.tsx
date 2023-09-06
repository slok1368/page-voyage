import LogInForm from '@/components/LogInForm';
import NavigationBar from '@/components/NavigationBar';

export default function LogIn() {
  return (
    <main className='flex h-screen flex-col'>
      <div className='flex flex-auto flex-col items-center justify-center'>
        <div className='rounded-xl bg-slate-100 p-6'>
          <h1 className='pb-3 text-3xl'>Log In</h1>
          <LogInForm />
        </div>
      </div>
    </main>
  );
}
