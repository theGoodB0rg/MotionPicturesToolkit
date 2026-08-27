import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { BentoItem, calculateSpringValue, getStaggerDelay } from '@motion-pictures/core';

export interface BentoGridProps {
  headline: string;
  subheadline?: string;
  items: BentoItem[];
  style?: CSSProperties;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  headline,
  subheadline,
  items,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header Animation
  const headerProgress = calculateSpringValue({
    frame,
    fps,
    delay: 0,
    config: 'snappy',
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '60px 80px',
        fontFamily: 'Inter, system-ui, sans-serif',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Section Header */}
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [30, 0])}px)`,
          textAlign: 'center',
          marginBottom: '48px',
        }}
      >
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {headline}
        </h2>
        {subheadline && (
          <p
            style={{
              fontSize: '20px',
              color: '#94A3B8',
              margin: 0,
            }}
          >
            {subheadline}
          </p>
        )}
      </div>

      {/* Bento Grid Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          width: '100%',
          maxWidth: '1280px',
        }}
      >
        {items.map((item, index) => {
          const cardDelay = 12 + getStaggerDelay(index, 6);
          const cardProgress = calculateSpringValue({
            frame,
            fps,
            delay: cardDelay,
            config: 'bouncy',
            from: 0,
            to: 1,
          });

          const accent = item.accentColor || '#6366F1';

          return (
            <div
              key={index}
              style={{
                opacity: cardProgress,
                transform: `translateY(${interpolate(
                  cardProgress,
                  [0, 1],
                  [50, 0]
                )}px) scale(${interpolate(cardProgress, [0, 1], [0.9, 1])})`,
                filter: `blur(${interpolate(cardProgress, [0, 1], [8, 0])}px)`,
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '32px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Glow Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
              />

              <div>
                {/* Optional Badge */}
                {item.badge && (
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      backgroundColor: `${accent}20`,
                      color: accent,
                      fontSize: '12px',
                      fontWeight: 700,
                      marginBottom: '16px',
                      border: `1px solid ${accent}40`,
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: '0 0 10px 0',
                  }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#94A3B8',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>

              {/* Large Metric Stat */}
              {item.stat && (
                <div style={{ marginTop: '28px' }}>
                  <div
                    style={{
                      fontSize: '44px',
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      color: accent,
                      textShadow: `0 0 30px ${accent}60`,
                    }}
                  >
                    {item.stat}
                  </div>
                  {item.statLabel && (
                    <div
                      style={{
                        fontSize: '13px',
                        color: '#64748B',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginTop: '4px',
                      }}
                    >
                      {item.statLabel}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
