'use client';
import React, { useState } from 'react';
import { GoogleSignIn } from './SignInProvider';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LogInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      }).then((res) => {
        if (res?.error === null) {
          toast.success('Log in successfully', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          router.push('/');
        } else {
          toast.error('Failed to Log in', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
    } catch (error) {
      // Handle any unexpected errors
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <Card className='w-[500px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address.'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Password</Label>
              <Input
                id='name'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password.'
              />
            </div>
          </div>
        </form>
        <Button className='mt-8 w-full' onClick={handleSubmit}>
          Log In
        </Button>
        <div className='flex w-full flex-row justify-between pt-2'>
          <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
          <p className='mb-4 mt-5 text-sm'>or</p>
          <span className='mt-8 h-[1px] w-5/12 bg-slate-400'></span>
        </div>
      </CardContent>
      <CardFooter className='flex'>
        <Button
          className='w-full px-10'
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <div className='flex items-center justify-center gap-2 space-y-1.5'>
            <FcGoogle size={18} />
            Sign in with Google
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}
