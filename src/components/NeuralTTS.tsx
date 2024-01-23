'use client';
import { bookFullContent } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Button } from './ui/button';
import { Voices } from '@/lib/azure-tts';

const FormSchema = z.object({
  voice: z.string({
    required_error: 'Please select a neural voice to create an audio.',
  }),
});

export default function NeuralTTS({
  voices,
  bookName,
  bookContent,
}: {
  voices: Voices;
  bookName: string;
  bookContent: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleCreateAudio = async (data: z.infer<typeof FormSchema>) => {
    const selectedVoice = voices.find(
      (voice) => voice.ShortName === data.voice
    );
    console.log(selectedVoice);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateAudio)}
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
                    <SelectValue placeholder='Select a neural voice' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem value={voice.ShortName} key={voice.ShortName}>
                      {`${voice.LocalName} - ${voice.LocaleName} - ${voice.Gender}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please ensure your story is ready before creating an audio. As
                it calls the Azure TTS API.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2 pl-2 pt-2'>
          <Button type='submit'>Create</Button>
        </div>
      </form>
    </Form>
  );
}
