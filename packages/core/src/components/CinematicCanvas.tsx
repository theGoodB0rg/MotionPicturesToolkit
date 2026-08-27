import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { CameraTrajectory } from '../types/storyboard.js';
import { calculateCameraTransform } from '../math/camera.js';

export interface CinematicCanvasProps {
  children: React.ReactNode;
  camera?: CameraTrajectory;
  vignette?: boolean;
  depthOfField?: boolean;
  style?: CSSProperties;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  children,
  camera,
  vignette = true,
  depthOfField = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const { scale, translateX, translateY, rotateX, rotateY } = calculateCameraTransform({
    frame,
    fps,
    trajectory: camera,
    viewportWidth: width,
    viewportHeight: height,
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        perspective: 1200,
        backgroundColor: '#090A0F',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: 'center center',
          transform: `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'none', // Strict deterministic frame math
          filter: depthOfField ? `blur(${Math.max(0, (scale - 1.2) * 1.5)}px)` : undefined,
        }}
      >
        {children}
      </div>

      {vignette && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      )}
    </div>
  );
};
