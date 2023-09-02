import SignUpForm from '@/components/SignUpForm';
import NavigationBar from '@/components/NavigationBar';

export default function SignUp() {
  return (
    <main className='flex h-screen flex-col'>
      <NavigationBar />
      <div className='flex flex-auto flex-col items-center justify-center'>
        <div className='rounded-xl bg-slate-100 p-6'>
          <h1 className='pb-3 text-3xl'>Sign Up</h1>
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
