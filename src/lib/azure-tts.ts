export type Voice = {
  LocalName: string;
  ShortName: string;
  Gender: string;
  LocaleName: string;
  Locale: string;
  SampleRateHertz: string;
  VoiceType: string;
};

export type Voices = Voice[];

export type VoicesResponse = {
  voices: Voices;
};

export async function getVoices(): Promise<Voices> {
  const azureTTSKey = process.env.SPEECH_KEY;

  if (!azureTTSKey) {
    throw new Error('Azure TTS Key not found');
  }

  const res = await fetch(
    'https://westus.tts.speech.microsoft.com/cognitiveservices/voices/list',
    {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': azureTTSKey,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch voices');
  }

  const voices = await res.json();

  if (voices) {
    const neuralVoices: Voices = voices.filter(
      (voice: Voice) =>
        voice.VoiceType === 'Neural' && voice.Locale.startsWith('en')
    );
    return neuralVoices;
  } else {
    throw new Error('No voices found');
  }
}
