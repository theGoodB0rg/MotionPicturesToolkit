export interface WordTimestamp {
  word: string;
  startMs: number;
  endMs: number;
  confidence?: number;
}

export interface SpeechSegment {
  text: string;
  audioFilePath: string;
  durationMs: number;
  words: WordTimestamp[];
}

export interface AudioSynthesisResult {
  audioBuffer: Buffer;
  audioFilePath?: string;
  durationMs: number;
  words: WordTimestamp[];
}

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female';
  locale: string;
  description?: string;
}

export const EDGE_TTS_VOICES: VoiceOption[] = [
  {
    id: 'en-US-ChristopherNeural',
    name: 'Christopher (US Modern Marketing)',
    gender: 'male',
    locale: 'en-US',
    description: 'Dynamic, clear, confident tech presenter voice',
  },
  {
    id: 'en-US-JennyNeural',
    name: 'Jenny (US Natural Conversational)',
    gender: 'female',
    locale: 'en-US',
    description: 'Warm, engaging, approachable SaaS voice',
  },
  {
    id: 'en-US-GuyNeural',
    name: 'Guy (US Professional Authoritative)',
    gender: 'male',
    locale: 'en-US',
    description: 'Crisp, articulate corporate explainer',
  },
  {
    id: 'en-GB-SoniaNeural',
    name: 'Sonia (British Modern Tech)',
    gender: 'female',
    locale: 'en-GB',
    description: 'Polished, elegant European presentation voice',
  },
  {
    id: 'en-AU-WilliamNeural',
    name: 'William (Australian Casual Tech)',
    gender: 'male',
    locale: 'en-AU',
    description: 'Enthusiastic, energetic startup vibe',
  },
];
