'use client';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { CreateBookRequestBody } from '@/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const maxNameLength = 100;

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Book name must be at least 2 characters long',
    })
    .max(maxNameLength, {
      message: `Book name must be less than ${maxNameLength} characters long`,
    }),
  content: z.string().min(10, {
    message: 'Book content must be at least 10 characters long',
  }),
});

export default function BookEditor() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      content: '',
    },
    mode: `onChange`,
  });

  async function saveOnClick(data: z.infer<typeof formSchema>) {
    const saveBookRequest: CreateBookRequestBody = {
      bookName: data.name,
      bookContent: data.content,
    };

    const res = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(saveBookRequest),
      cache: 'no-store',
    });

    if (res.ok) {
      toast.success('Created Book', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      const resJson = await res.json();
      router.push('/MyBooks/' + resJson.content);
      router.refresh();
    } else {
      toast.error('Failed to create book', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  return (
    <main className='mx-auto w-11/12 sm:w-8/12' style={{ height: '80vh' }}>
      <div className='flex flex-row items-baseline justify-between'>
        <h2 className='mb-6 scroll-m-20 border-b-2 border-foreground pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
          Book Editor
        </h2>
      </div>
      <div className='h-8/12'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveOnClick)}
            className='h-full space-y-6'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='border-2'
                      placeholder='Title'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='h-3/4'>
                  <FormControl>
                    <Textarea
                      className='h-full border-2'
                      placeholder='Tell us the story...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
