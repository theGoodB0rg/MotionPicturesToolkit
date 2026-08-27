import { interpolate } from 'remotion';
import { SpeechSegment } from '../tts/types.js';

export interface DuckingOptions {
  baseVolume?: number; // default 0.8
  duckedVolume?: number; // default 0.15 (-14dB)
  rampFrames?: number; // default 15 frames (~250ms at 60fps)
}

/**
 * Calculates deterministic frame-by-frame background audio volume with automatic voiceover ducking
 */
export function calculateDuckingVolume(options: {
  frame: number;
  fps: number;
  speechSegments?: Array<{ startFrame: number; durationFrames: number }> | SpeechSegment[];
  duckingOptions?: DuckingOptions;
}): number {
  const { frame, fps, speechSegments = [], duckingOptions = {} } = options;
  const baseVolume = duckingOptions.baseVolume ?? 0.8;
  const duckedVolume = duckingOptions.duckedVolume ?? 0.15;
  const rampFrames = duckingOptions.rampFrames ?? Math.round(fps * 0.25);

  if (speechSegments.length === 0) {
    return baseVolume;
  }

  // Normalize speech segments to frame ranges
  const frameRanges: Array<{ start: number; end: number }> = speechSegments.map((segment) => {
    if ('startFrame' in segment) {
      return {
        start: segment.startFrame,
        end: segment.startFrame + segment.durationFrames,
      };
    }
    const startFrame = 0;
    const durationFrames = Math.round((segment.durationMs / 1000) * fps);
    return {
      start: startFrame,
      end: startFrame + durationFrames,
    };
  });

  for (const range of frameRanges) {
    // Before active voice
    if (frame < range.start - rampFrames) {
      continue;
    }

    // Ramping down into voice
    if (frame >= range.start - rampFrames && frame < range.start) {
      return interpolate(
        frame,
        [range.start - rampFrames, range.start],
        [baseVolume, duckedVolume],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }

    // In the middle of voice
    if (frame >= range.start && frame <= range.end) {
      return duckedVolume;
    }

    // Ramping back up after voice
    if (frame > range.end && frame <= range.end + rampFrames) {
      return interpolate(
        frame,
        [range.end, range.end + rampFrames],
        [duckedVolume, baseVolume],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
  }

  return baseVolume;
}
