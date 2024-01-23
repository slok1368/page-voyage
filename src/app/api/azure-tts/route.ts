import { NextRequest, NextResponse } from 'next/server';
import { Voices, getVoices } from '@/lib/azure-tts';

export async function GET(req: NextRequest) {
  try {
    const voices: Voices = await getVoices();
    return NextResponse.json(voices);
  } catch (error) {
    console.log('Internal server error when getting voices');
    return NextResponse.json(
      { error: `Internal Server Error when getting voices` },
      { status: 500 }
    );
  }
}
