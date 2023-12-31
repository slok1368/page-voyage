'use client';
import { bookFullContent } from '@/types';
import React, { useEffect, useState } from 'react';
import { convert } from 'html-to-text';
import { usePathname } from 'next/navigation';
export default function SppechSynthesisComponent({
  book_name,
  book_content,
}: bookFullContent) {
  const pathName = usePathname();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const bookContent = convert(book_content);
  useEffect(() => {
    const synth = window.speechSynthesis;
    const populateVoiceList = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    populateVoiceList();

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    setSelectedVoice(voices[0]);
    console.log(voices);
    // Add a route change listener to stop speech synthesis when redirecting
    handleStop();
  }, [pathName]);

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedVoice(
      voices.find((voice) => voice.name === selectedOption) || null
    );
  };

  const handleSpeak = () => {
    console.log(selectedVoice);
    if (selectedVoice) {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(
        book_name + '. ' + bookContent
      );
      utterThis.voice = selectedVoice;
      synth.speak(utterThis);
      setSpeaking(true);
    }
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setSpeaking(false);
  };

  const englishVoices = voices.filter((voice) => voice.lang.startsWith('en'));
  return (
    <div className='flex flex-col gap-2 font-sans text-black'>
      <select onChange={handleVoiceChange} value={selectedVoice?.name || ''}>
        <option value=''>Select a voice</option>
        {englishVoices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {`${voice.name} (${voice.lang})`}
            {voice.default && ' — DEFAULT'}
          </option>
        ))}
      </select>

      <button
        className='rounded-md bg-blue-300 px-5 py-2'
        onClick={handleSpeak}
        disabled={speaking}
      >
        Speak
      </button>
      <button
        className='rounded-md bg-red-300 px-5 py-2'
        onClick={handleStop}
        disabled={!speaking}
      >
        Stop
      </button>
    </div>
  );
}
