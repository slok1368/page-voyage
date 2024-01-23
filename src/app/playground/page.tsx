'use client';
import React, { useEffect, useState } from 'react';
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
import { set, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  CaretDownIcon,
  SpeakerModerateIcon,
  TriangleDownIcon,
} from '@radix-ui/react-icons';

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
  sections: z.array(z.string()),
});

export default function Playground() {
  const router = useRouter();
  //   const [sections, setSections] = useState<string[]>(['']);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      sections: [''],
    },
    mode: `onChange`,
  });

  useEffect(() => {
    console.log('Sections changed:', form.watch('sections'));
  }, [form.watch('sections')]);

  async function saveOnClick(data: z.infer<typeof formSchema>) {
    // const res = await fetch('/api/books', {
    //   method: 'POST',
    //   body: JSON.stringify(saveBookRequest),
    //   cache: 'no-store',
    // });

    // if (res.ok) {
    //   toast.success('Created Book', {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //   });
    //   const resJson = await res.json();
    //   router.push('/MyBooks/' + resJson.content);
    //   router.refresh();
    // } else {
    //   toast.error('Failed to create book', {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //   });
    // }
    console.log(data.sections);
  }

  function handleSpeakReamaining(index: number) {
    const utterThis = new SpeechSynthesisUtterance(
      form.getValues('sections').slice(index).join(' ')
    );
    window.speechSynthesis.speak(utterThis);
  }

  return (
    <main className='mx-auto w-11/12 sm:w-8/12' style={{ height: '80vh' }}>
      <div className='flex flex-row items-baseline justify-between'>
        <h2 className='mb-6 scroll-m-20 border-b-2 border-foreground pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
          Playground
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
            <div className='flex flex-col gap-4'>
              {form.getValues('sections').map((section, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`sections.${index}`}
                  render={({ field }) => (
                    <div className='flex h-full flex-row justify-between gap-2'>
                      <FormItem className='h-full w-full'>
                        <FormControl>
                          <Textarea
                            className='h-[150px] border-2'
                            placeholder={`Section ${index}...`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      {/* Buttons to read section or start reading from this section */}
                      <div className='flex flex-col items-center justify-center gap-2'>
                        <Button
                          type='button'
                          variant='secondary'
                          size='icon'
                          onClick={() => {
                            const utterThis = new SpeechSynthesisUtterance(
                              field.value
                            );
                            window.speechSynthesis.speak(utterThis);
                          }}
                        >
                          <SpeakerModerateIcon className='h-4 w-4' />
                        </Button>
                        <Button
                          type='button'
                          variant='secondary'
                          className='flex  flex-row items-center justify-center'
                          onClick={() => handleSpeakReamaining(index)}
                        >
                          <SpeakerModerateIcon className='h-4 w-4' />
                          <CaretDownIcon className='h-6 w-6' />
                        </Button>
                      </div>
                    </div>
                  )}
                />
              ))}
              <div className='flex flex-row justify-center gap-10'>
                <Button
                  type='button'
                  onClick={() => {
                    form.setValue(
                      'sections',
                      form.getValues('sections').slice(0, -1)
                    );
                    console.log('after removing: ', form.getValues('sections'));
                  }}
                  className={cn(
                    'w-fit',
                    form.getValues('sections').length === 1 && 'hidden'
                  )}
                >
                  Remove Section
                </Button>
                <Button
                  type='button'
                  onClick={() => {
                    form.setValue('sections', [
                      ...form.getValues('sections'),
                      '',
                    ]);
                  }}
                  className='w-fit'
                >
                  Add Section
                </Button>
              </div>
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
