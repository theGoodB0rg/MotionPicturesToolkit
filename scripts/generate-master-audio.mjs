import { EdgeTtsClient } from '../packages/audio/dist/index.js';
import fs from 'node:fs';
import path from 'node:path';

async function generateMasterVoiceover() {
  const script =
    'Stop spending weeks manually editing product videos. Transform your codebase into marketing cinema. ' +
    'MotionPicturesToolkit automatically captures your app, adds smooth camera zooms, and wraps screens in photorealistic 3D device frames. ' +
    'Powered by zero-cost neural voiceovers, Three.js mockups, and the Virtual Director engine. ' +
    'Run npx motion-pictures init in your repository today and launch your next product video in style.';

  const voice = 'en-US-ChristopherNeural';
  console.log(`🎙️ Generating complete master voiceover with voice: ${voice}...`);

  const client = new EdgeTtsClient({ voice });
  const result = await client.synthesize(script);

  const outDir = path.join(process.cwd(), 'projects', 'demo-saas-web', 'public', 'audio');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const audioPath = path.join(outDir, 'voiceover.mp3');
  const jsonPath = path.join(outDir, 'voiceover_timestamps.json');

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

  console.log(`✅ Master audio saved (${result.audioBuffer.length} bytes): ${audioPath}`);
  console.log(`✅ Master timestamps (${result.words.length} words): ${jsonPath}`);
  console.log(`⏱️ Duration: ${(result.durationMs / 1000).toFixed(2)}s`);
}

generateMasterVoiceover().catch(console.error);
