import SignUpForm from '@/components/SignUpForm';
import NavigationBar from '@/components/NavigationBar';

export default function SignUp() {
  return (
    <main className='mt-7 flex flex-col'>
      <div className='flex flex-col items-center'>
        <div className='rounded-xl bg-slate-100 p-6'>
          <h2 className='pb-3'>Sign Up</h2>
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
