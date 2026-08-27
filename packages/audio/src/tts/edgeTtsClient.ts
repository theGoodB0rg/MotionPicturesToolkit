import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { AudioSynthesisResult, WordTimestamp } from './types.js';

export interface EdgeTtsOptions {
  voice?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
}

/**
 * High-performance, zero-key Edge-TTS client with native WordBoundary extraction
 */
export class EdgeTtsClient {
  private voice: string;
  private tts: MsEdgeTTS;

  constructor(options: EdgeTtsOptions = {}) {
    this.voice = options.voice || 'en-US-ChristopherNeural';
    this.tts = new MsEdgeTTS();
  }

  /**
   * Synthesizes text into MP3 audio and extracts exact word-boundary timestamps
   */
  async synthesize(text: string): Promise<AudioSynthesisResult> {
    await this.tts.setMetadata(this.voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, {
      wordBoundaryEnabled: true,
      sentenceBoundaryEnabled: false,
    });

    const { audioStream, metadataStream } = this.tts.toStream(text);
    const audioChunks: Buffer[] = [];
    const words: WordTimestamp[] = [];
    let maxEndMs = 0;

    if (metadataStream) {
      metadataStream.on('data', (data: Buffer | string) => {
        try {
          const parsed = typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString());
          if (parsed.Metadata) {
            for (const item of parsed.Metadata) {
              if (item.Type === 'WordBoundary') {
                const startMs = Math.round(item.Data.Offset / 10000);
                const endMs = Math.round((item.Data.Offset + item.Data.Duration) / 10000);
                words.push({
                  word: item.Data.text.Text,
                  startMs,
                  endMs,
                });

                if (endMs > maxEndMs) {
                  maxEndMs = endMs;
                }
              }
            }
          }
        } catch {
          // Ignore metadata parse irregularities
        }
      });
    }

    audioStream.on('data', (chunk: Buffer) => {
      audioChunks.push(chunk);
    });

    return new Promise((resolve, reject) => {
      audioStream.on('end', () => {
        const audioBuffer = Buffer.concat(audioChunks);
        resolve({
          audioBuffer,
          durationMs: maxEndMs || Math.round((text.split(' ').length / 2.5) * 1000),
          words,
        });
      });

      audioStream.on('error', (err: Error) => {
        reject(err);
      });
    });
  }
}
