import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { calculateSpringValue, getStaggerDelay } from '@motion-pictures/core';

export interface KineticHeadlineProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  highlightWord?: string;
  highlightColor?: string;
  delayFrames?: number;
  align?: 'center' | 'left' | 'right';
  fontSize?: number;
  style?: CSSProperties;
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  title,
  subtitle,
  badgeText,
  highlightWord,
  highlightColor = 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
  delayFrames = 0,
  align = 'center',
  fontSize = 64,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = title.split(' ');

  // Badge Spring Animation
  const badgeProgress = calculateSpringValue({
    frame,
    fps,
    delay: delayFrames,
    config: 'snappy',
    from: 0,
    to: 1,
  });

  // Subtitle Spring Animation
  const subtitleProgress = calculateSpringValue({
    frame,
    fps,
    delay: delayFrames + words.length * 3 + 10,
    config: 'smooth',
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        textAlign: align,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        ...style,
      }}
    >
      {/* Optional Top Pill Badge */}
      {badgeText && (
        <div
          style={{
            opacity: badgeProgress,
            transform: `translateY(${interpolate(badgeProgress, [0, 1], [20, 0])}px) scale(${interpolate(
              badgeProgress,
              [0, 1],
              [0.85, 1]
            )})`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            color: '#E2E8F0',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#6366F1',
              boxShadow: '0 0 10px #6366F1',
            }}
          />
          {badgeText}
        </div>
      )}

      {/* Main Kinetic Title Words */}
      <h1
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
          columnGap: '16px',
          rowGap: '8px',
          margin: 0,
          padding: 0,
          fontSize: `${fontSize}px`,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
        }}
      >
        {words.map((word, index) => {
          const wordDelay = delayFrames + 4 + getStaggerDelay(index, 4);
          const progress = calculateSpringValue({
            frame,
            fps,
            delay: wordDelay,
            config: 'bouncy',
            from: 0,
            to: 1,
          });

          const isHighlighted =
            highlightWord &&
            word.toLowerCase().includes(highlightWord.toLowerCase());

          return (
            <span
              key={index}
              style={{
                display: 'inline-block',
                opacity: progress,
                transform: `translateY(${interpolate(
                  progress,
                  [0, 1],
                  [40, 0]
                )}px) scale(${interpolate(progress, [0, 1], [0.85, 1])})`,
                filter: `blur(${interpolate(progress, [0, 1], [8, 0])}px)`,
                background: isHighlighted ? highlightColor : undefined,
                WebkitBackgroundClip: isHighlighted ? 'text' : undefined,
                WebkitTextFillColor: isHighlighted ? 'transparent' : undefined,
                textShadow: isHighlighted
                  ? '0 0 40px rgba(99, 102, 241, 0.4)'
                  : '0 4px 24px rgba(0, 0, 0, 0.5)',
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            opacity: subtitleProgress,
            transform: `translateY(${interpolate(
              subtitleProgress,
              [0, 1],
              [24, 0]
            )}px)`,
            filter: `blur(${interpolate(subtitleProgress, [0, 1], [6, 0])}px)`,
            margin: '24px 0 0 0',
            fontSize: `${Math.round(fontSize * 0.38)}px`,
            fontWeight: 400,
            lineHeight: 1.45,
            color: '#94A3B8',
            maxWidth: '800px',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
