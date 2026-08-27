import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { calculateSpringValue } from '@motion-pictures/core';

export interface PillCalloutProps {
  text: string;
  atFrame?: number;
  durationFrames?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | { x: number; y: number };
  accentColor?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
  style?: CSSProperties;
}

export const PillCallout: React.FC<PillCalloutProps> = ({
  text,
  atFrame = 0,
  durationFrames = 150,
  position = 'top-left',
  accentColor = '#6366F1',
  icon,
  pulse = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = frame - atFrame;

  if (elapsed < 0 || elapsed > durationFrames) {
    return null;
  }

  // Entrance spring
  const enterProgress = calculateSpringValue({
    frame: elapsed,
    fps,
    config: 'bouncy',
    from: 0,
    to: 1,
  });

  // Exit fade
  const exitProgress = interpolate(
    elapsed,
    [durationFrames - 15, durationFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = enterProgress * exitProgress;
  const scale = enterProgress;
  const translateY = interpolate(enterProgress, [0, 1], [15, 0]);

  // Pulse oscillation
  const pulseScale = pulse
    ? 1 + Math.sin((elapsed / fps) * Math.PI * 3) * 0.05
    : 1;

  let posStyle: CSSProperties = { top: '30px', left: '30px' };
  if (typeof position === 'object') {
    posStyle = { top: `${position.y}px`, left: `${position.x}px` };
  } else if (position === 'top-right') {
    posStyle = { top: '30px', right: '30px' };
  } else if (position === 'bottom-left') {
    posStyle = { bottom: '30px', left: '30px' };
  } else if (position === 'bottom-right') {
    posStyle = { bottom: '30px', right: '30px' };
  } else if (position === 'center') {
    posStyle = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 50,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * pulseScale})`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px',
        borderRadius: '9999px',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        border: `1px solid ${accentColor}80`,
        backdropFilter: 'blur(16px)',
        boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 0 25px ${accentColor}40`,
        color: '#FFFFFF',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '15px',
        fontWeight: 600,
        pointerEvents: 'none',
        ...posStyle,
        ...style,
      }}
    >
      {/* Radar Pulse Beacon */}
      <div
        style={{
          position: 'relative',
          width: '10px',
          height: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: accentColor,
            opacity: 0.75,
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
          }}
        />
        <span
          style={{
            position: 'relative',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />
      </div>

      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span>{text}</span>
    </div>
  );
};
