import fs from 'node:fs';
import path from 'node:path';
import { EdgeTtsClient } from '@motion-pictures/audio/server';

export interface AudioGenerateOptions {
  text?: string;
  scriptFile?: string;
  voice?: string;
  outputDir?: string;
  filename?: string;
}

export async function audioGenerateCommand(options: AudioGenerateOptions = {}): Promise<void> {
  const voice = options.voice || 'en-US-ChristopherNeural';
  const outputDir = options.outputDir || path.join(process.cwd(), 'assets', 'audio');
  const filename = options.filename || 'voiceover';

  let scriptText = options.text;
  if (!scriptText && options.scriptFile && fs.existsSync(options.scriptFile)) {
    scriptText = fs.readFileSync(options.scriptFile, 'utf-8');
  }

  if (!scriptText) {
    scriptText =
      'Transform your codebase into cinematic promo videos with MotionPicturesToolkit. Automated screen capture, dynamic camera choreography, and zero-cost neural voiceovers.';
  }

  console.log(`🎙️ Synthesizing voiceover with Edge-TTS voice: ${voice}...`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const client = new EdgeTtsClient({ voice });
  const result = await client.synthesize(scriptText);

  const audioPath = path.join(outputDir, `${filename}.mp3`);
  const jsonPath = path.join(outputDir, `${filename}_timestamps.json`);

  fs.writeFileSync(audioPath, result.audioBuffer);
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        voice,
        durationMs: result.durationMs,
        wordsCount: result.words.length,
        words: result.words,
      },
      null,
      2
    ),
    'utf-8'
  );

  console.log(`✅ Audio saved to: ${audioPath}`);
  console.log(`✅ Timestamps (${result.words.length} words) saved to: ${jsonPath}`);
  console.log(`⏱️ Total duration: ${(result.durationMs / 1000).toFixed(2)}s`);
}
