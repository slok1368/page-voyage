import LogInForm from '@/components/LogInForm';
import NavigationBar from '@/components/NavigationBar';

export default function LogIn() {
  return (
    <main className='mt-7 flex flex-col'>
      <div className='flex flex-col items-center'>
        <div className='rounded-xl bg-slate-100 p-6'>
          <h2 className='pb-3'>Log In</h2>
          <LogInForm />
        </div>
      </div>
    </main>
  );
}
