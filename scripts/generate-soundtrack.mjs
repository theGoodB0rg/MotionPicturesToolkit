import fs from 'node:fs';
import path from 'node:path';

// Generate a high quality 30-second stereo WAV soundtrack
function generateSoundtrackWav() {
  const sampleRate = 44100;
  const durationSeconds = 30;
  const numSamples = sampleRate * durationSeconds;
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit PCM

  const buffer = Buffer.alloc(44 + numSamples * numChannels * bytesPerSample);

  // WAV Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * numChannels * bytesPerSample, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22); // NumChannels
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // ByteRate
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32); // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * numChannels * bytesPerSample, 40);

  // Chords: Fm (F3, Ab3, C4), Db (Db3, F3, Ab3), Ab (Ab3, C4, Eb4), Eb (Eb3, G3, Bb3)
  const chordProgression = [
    [174.61, 207.65, 261.63, 87.31], // Fm
    [138.59, 174.61, 207.65, 69.3],  // Db
    [207.65, 261.63, 311.13, 103.83], // Ab
    [155.56, 196.0, 233.08, 77.78],   // Eb
  ];

  let offset = 44;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const chordIndex = Math.floor((t / 3.75) % 4);
    const chord = chordProgression[chordIndex];

    // Synth Pad
    let leftSample = 0;
    let rightSample = 0;

    // Harmonic layers
    for (let f = 0; f < 3; f++) {
      const freq = chord[f];
      const detuneL = freq * 0.998;
      const detuneR = freq * 1.002;
      const waveL = Math.sin(2 * Math.PI * detuneL * t) * 0.12;
      const waveR = Math.sin(2 * Math.PI * detuneR * t) * 0.12;
      leftSample += waveL;
      rightSample += waveR;
    }

    // Warm Sub Bass
    const bassFreq = chord[3];
    const bass = Math.sin(2 * Math.PI * bassFreq * t) * 0.18;
    leftSample += bass;
    rightSample += bass;

    // Subtle Arp Pluck (high register)
    const arpNote = chord[(Math.floor(t * 4)) % 3] * 2;
    const arpEnv = Math.exp(-((t * 4) % 1) * 8);
    const arp = Math.sin(2 * Math.PI * arpNote * t) * arpEnv * 0.08;
    leftSample += arp * 0.8;
    rightSample += arp * 1.2;

    // Master Envelope (Fade in and Fade out)
    let masterEnv = 1.0;
    if (t < 1.0) masterEnv = t;
    if (t > 28.5) masterEnv = (30 - t) / 1.5;

    leftSample *= masterEnv;
    rightSample *= masterEnv;

    // Clamp to 16-bit integer range
    const intL = Math.max(-32768, Math.min(32767, Math.round(leftSample * 32767 * 0.75)));
    const intR = Math.max(-32768, Math.min(32767, Math.round(rightSample * 32767 * 0.75)));

    buffer.writeInt16LE(intL, offset);
    buffer.writeInt16LE(intR, offset + 2);
    offset += 4;
  }

  const outDir = path.join(process.cwd(), 'projects', 'demo-saas-web', 'public', 'audio');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'music.wav');
  fs.writeFileSync(outPath, buffer);
  console.log(`🎵 Generated 30s broadcast-ready soundtrack WAV: ${outPath} (${buffer.length} bytes)`);
}

generateSoundtrackWav();
