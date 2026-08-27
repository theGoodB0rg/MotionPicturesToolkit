import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { WordTimestamp } from '../tts/types.js';

export interface KineticSubtitlesProps {
  words: WordTimestamp[];
  startFrame?: number;
  highlightColor?: string;
  inactiveColor?: string;
  fontSize?: number;
  fontFamily?: string;
  preset?: 'karaoke-glow' | 'minimal-clean' | 'tiktok-pop';
  style?: CSSProperties;
}

export const KineticSubtitles: React.FC<KineticSubtitlesProps> = ({
  words = [],
  startFrame = 0,
  highlightColor = '#6366F1',
  inactiveColor = '#94A3B8',
  fontSize = 32,
  fontFamily = 'Inter, system-ui, sans-serif',
  preset = 'karaoke-glow',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!words || words.length === 0) {
    return null;
  }

  const currentMs = ((frame - startFrame) / fps) * 1000;

  // Find currently active word index
  let activeIndex = -1;
  for (let i = 0; i < words.length; i++) {
    if (currentMs >= words[i].startMs && currentMs <= words[i].endMs + 100) {
      activeIndex = i;
      break;
    }
  }

  // Determine window of words to display (e.g. 5-7 words around active word)
  const windowSize = 6;
  const chunkIndex = Math.floor(Math.max(0, activeIndex) / windowSize);
  const visibleWords = words.slice(
    chunkIndex * windowSize,
    (chunkIndex + 1) * windowSize
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 28px',
        borderRadius: '20px',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        fontFamily,
        fontSize: `${fontSize}px`,
        fontWeight: 700,
        zIndex: 60,
        pointerEvents: 'none',
        maxWidth: '85%',
        ...style,
      }}
    >
      {visibleWords.map((item, idx) => {
        const globalIdx = chunkIndex * windowSize + idx;
        const isActive = globalIdx === activeIndex;
        const isPast = currentMs > item.endMs;

        let scale = 1.0;
        let color = inactiveColor;
        let textShadow = 'none';

        if (isActive) {
          scale = preset === 'tiktok-pop' ? 1.25 : 1.12;
          color = '#FFFFFF';
          textShadow = `0 0 20px ${highlightColor}`;
        } else if (isPast) {
          color = '#CBD5E1';
        }

        return (
          <span
            key={globalIdx}
            style={{
              display: 'inline-block',
              color,
              transform: `scale(${scale})`,
              transition: 'transform 0.08s ease-out, color 0.08s ease-out',
              textShadow,
              backgroundColor: isActive && preset === 'tiktok-pop' ? highlightColor : 'transparent',
              padding: isActive && preset === 'tiktok-pop' ? '2px 8px' : '0',
              borderRadius: '6px',
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};
