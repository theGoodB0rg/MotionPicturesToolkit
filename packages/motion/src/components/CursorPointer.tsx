import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { calculateSpringValue } from '@motion-pictures/core';

export interface CursorWaypoint {
  atFrame: number;
  x: number;
  y: number;
  click?: boolean;
}

export interface CursorPointerProps {
  waypoints?: CursorWaypoint[];
  initialPosition?: { x: number; y: number };
  color?: string;
  size?: number;
  style?: CSSProperties;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
  waypoints = [],
  initialPosition = { x: 960, y: 540 },
  color = '#FFFFFF',
  size = 28,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (waypoints.length === 0) {
    return null;
  }

  const sortedWaypoints = [...waypoints].sort((a, b) => a.atFrame - b.atFrame);

  let currentX = initialPosition.x;
  let currentY = initialPosition.y;
  let isClicking = false;
  let clickElapsed = -1;

  for (let i = 0; i < sortedWaypoints.length; i++) {
    const wp = sortedWaypoints[i];
    const prevWp = i > 0 ? sortedWaypoints[i - 1] : { atFrame: 0, x: initialPosition.x, y: initialPosition.y };

    if (frame >= wp.atFrame) {
      const travelDuration = Math.max(15, wp.atFrame - prevWp.atFrame);
      const progress = calculateSpringValue({
        frame: frame - prevWp.atFrame,
        fps,
        config: 'smooth',
        from: 0,
        to: 1,
      });

      currentX = interpolate(progress, [0, 1], [prevWp.x, wp.x]);
      currentY = interpolate(progress, [0, 1], [prevWp.y, wp.y]);

      if (wp.click && frame >= wp.atFrame && frame < wp.atFrame + 25) {
        isClicking = true;
        clickElapsed = frame - wp.atFrame;
      }
    }
  }

  // Click ripple calculation
  const rippleScale = clickElapsed >= 0 ? interpolate(clickElapsed, [0, 25], [0.8, 2.2]) : 1;
  const rippleOpacity = clickElapsed >= 0 ? interpolate(clickElapsed, [0, 25], [0.7, 0]) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate3d(${currentX}px, ${currentY}px, 0px)`,
        zIndex: 100,
        pointerEvents: 'none',
        transition: 'none',
        ...style,
      }}
    >
      {/* Click Ripple Indicator */}
      {isClicking && (
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '-15px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(99, 102, 241, 0.4)',
            border: '2px solid rgba(99, 102, 241, 0.8)',
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* SVG Modern macOS/ScreenStudio Pointer */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
          filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5))',
        }}
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill={color}
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
