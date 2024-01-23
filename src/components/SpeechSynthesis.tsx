'use client';
import { bookFullContent } from '@/types';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';

const FormSchema = z.object({
  voice: z.string({
    required_error: 'Please select voice to narrate.',
  }),
});

export default function SpeechSynthesis({ content }: { content: string }) {
  const pathName = usePathname();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [rate, setRate] = useState(1);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const populateVoiceList = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    populateVoiceList();

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    // Add a route change listener to stop speech synthesis when redirecting
    handleStop();
  }, [pathName]);

  const handleSpeak = (data: z.infer<typeof FormSchema>) => {
    window.speechSynthesis.cancel();
    const utterThis = new SpeechSynthesisUtterance(content);
    utterThis.rate = rate;
    utterThis.voice = voices.find((voice) => voice.name === data.voice) || null;
    window.speechSynthesis.speak(utterThis);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  const englishVoices = voices.filter((voice) => voice.lang.startsWith('en'));
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSpeak)}
        className='flex w-2/3 flex-row space-y-6'
      >
        <FormField
          control={form.control}
          name='voice'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a voice to narrate' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {englishVoices.map((voice) => (
                    <SelectItem value={voice.name} key={voice.name}>
                      {`${voice.name} (${voice.lang})`}
                      {voice.default && ' — DEFAULT'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Recommended to use Microsoft Edge Browser to get more neural
                voices.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2 pl-2 pt-2'>
          <Button type='submit'>Read</Button>
          <Button
            className='text-destructive-fore bg-destructive/70 hover:bg-destructive/60'
            type='button'
            onClick={handleStop}
          >
            Stop
          </Button>
          <div>
            <div>Rate</div>
            <input
              type='range'
              min='0'
              max='2'
              step='0.1'
              defaultValue='1'
              onChange={(event) => setRate(parseFloat(event.target.value))}
            />
            <div>{rate}</div>
          </div>
        </div>
      </form>
    </Form>
  );
}
