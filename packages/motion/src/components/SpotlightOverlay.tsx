import React, { CSSProperties } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface SpotlightOverlayProps {
  active?: boolean;
  atFrame?: number;
  durationFrames?: number;
  focusArea?: {
    x: number; // percentage 0 to 100
    y: number; // percentage 0 to 100
    radius?: number;
  };
  dimOpacity?: number;
  style?: CSSProperties;
}

export const SpotlightOverlay: React.FC<SpotlightOverlayProps> = ({
  active = true,
  atFrame = 0,
  durationFrames = 120,
  focusArea = { x: 50, y: 50, radius: 250 },
  dimOpacity = 0.75,
  style = {},
}) => {
  const frame = useCurrentFrame();

  if (!active) return null;

  const elapsed = frame - atFrame;
  if (elapsed < 0 || elapsed > durationFrames) return null;

  const fadeIn = interpolate(elapsed, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    elapsed,
    [durationFrames - 15, durationFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = Math.min(fadeIn, fadeOut) * dimOpacity;
  const radius = focusArea.radius ?? 250;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 40,
        opacity,
        background: `radial-gradient(circle ${radius}px at ${focusArea.x}% ${focusArea.y}%, transparent 40%, rgba(0, 0, 0, 0.85) 100%)`,
        ...style,
      }}
    />
  );
};
