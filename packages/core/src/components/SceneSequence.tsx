import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { SceneDefinition, TransitionType } from '../types/storyboard.js';

export interface SceneSequenceProps {
  scene: SceneDefinition;
  fromFrame: number;
  durationInFrames: number;
  children: React.ReactNode;
}

export function applySceneTransition(
  frame: number,
  durationInFrames: number,
  transition: TransitionType = 'fade'
): React.CSSProperties {
  const transitionFrames = 15;

  if (transition === 'none') {
    return {};
  }

  // Fade In / Out
  if (transition === 'fade' || transition === 'fade-through-black') {
    const fadeIn = interpolate(frame, [0, transitionFrames], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const fadeOut = interpolate(
      frame,
      [durationInFrames - transitionFrames, durationInFrames],
      [1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );

    return {
      opacity: Math.min(fadeIn, fadeOut),
    };
  }

  // Slide Left
  if (transition === 'slide-left') {
    const slideIn = interpolate(frame, [0, transitionFrames], [100, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return {
      transform: `translateX(${slideIn}px)`,
    };
  }

  // Zoom In
  if (transition === 'zoom-in') {
    const zoomProgress = interpolate(frame, [0, transitionFrames], [0.9, 1.0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return {
      transform: `scale(${zoomProgress})`,
    };
  }

  return {};
}

export const SceneSequence: React.FC<SceneSequenceProps> = ({
  scene,
  fromFrame,
  durationInFrames,
  children,
}) => {
  return (
    <Sequence from={fromFrame} durationInFrames={durationInFrames}>
      <SceneWrapper scene={scene} durationInFrames={durationInFrames}>
        {children}
      </SceneWrapper>
    </Sequence>
  );
};

const SceneWrapper: React.FC<{
  scene: SceneDefinition;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ scene, durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const transitionStyle = applySceneTransition(
    frame,
    durationInFrames,
    scene.transition ?? 'fade'
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        ...transitionStyle,
      }}
    >
      {children}
    </div>
  );
};
