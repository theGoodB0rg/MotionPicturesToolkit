import { interpolate } from 'remotion';
import { CameraKeyframe, CameraTrajectory } from '../types/storyboard.js';
import { calculateSpringValue } from './spring.js';

export interface CameraState {
  scale: number;
  translateX: number;
  translateY: number;
  rotateX: number;
  rotateY: number;
}

export interface TargetCoordinate {
  x: number;
  y: number;
}

export const TARGET_PRESETS: Record<string, TargetCoordinate> = {
  center: { x: 0.5, y: 0.5 },
  'top-left': { x: 0.25, y: 0.25 },
  'top-right': { x: 0.75, y: 0.25 },
  'bottom-left': { x: 0.25, y: 0.75 },
  'bottom-right': { x: 0.75, y: 0.75 },
};

export function resolveTargetCoordinate(
  target: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | { x: number; y: number }
): TargetCoordinate {
  if (typeof target === 'string') {
    return TARGET_PRESETS[target] || TARGET_PRESETS.center;
  }
  return target;
}

/**
 * Calculates deterministic camera transform (scale, translateX, translateY, 3D tilt) for any given frame
 */
export function calculateCameraTransform(options: {
  frame: number;
  fps: number;
  trajectory?: CameraTrajectory;
  viewportWidth: number;
  viewportHeight: number;
}): CameraState {
  const { frame, fps, trajectory, viewportWidth, viewportHeight } = options;

  if (!trajectory || !trajectory.moves || trajectory.moves.length === 0) {
    const defaultZoom = trajectory?.initialZoom ?? 1.0;
    const initialCoord = resolveTargetCoordinate(trajectory?.initialTarget ?? 'center');
    const translateX = (0.5 - initialCoord.x) * viewportWidth * (defaultZoom - 1);
    const translateY = (0.5 - initialCoord.y) * viewportHeight * (defaultZoom - 1);

    return {
      scale: defaultZoom,
      translateX,
      translateY,
      rotateX: 0,
      rotateY: 0,
    };
  }

  let currentZoom = trajectory.initialZoom ?? 1.0;
  let currentTarget = resolveTargetCoordinate(trajectory.initialTarget ?? 'center');

  // Sort keyframes chronologically
  const sortedMoves = [...trajectory.moves].sort((a, b) => a.atFrame - b.atFrame);

  for (let i = 0; i < sortedMoves.length; i++) {
    const move = sortedMoves[i];
    const prevMove = i > 0 ? sortedMoves[i - 1] : null;

    const startFrame = move.atFrame;
    const moveDuration = move.duration ?? Math.round(fps * 0.8);
    const prevZoom = prevMove ? prevMove.zoom : (trajectory.initialZoom ?? 1.0);
    const prevTarget = resolveTargetCoordinate(
      prevMove ? prevMove.target : (trajectory.initialTarget ?? 'center')
    );
    const nextTarget = resolveTargetCoordinate(move.target);

    if (frame >= startFrame) {
      if (frame < startFrame + moveDuration) {
        // Active transition interpolation with spring physics
        const progress = calculateSpringValue({
          frame: frame - startFrame,
          fps,
          config: move.easing ?? 'cinematic',
          from: 0,
          to: 1,
        });

        currentZoom = interpolate(progress, [0, 1], [prevZoom, move.zoom]);
        currentTarget = {
          x: interpolate(progress, [0, 1], [prevTarget.x, nextTarget.x]),
          y: interpolate(progress, [0, 1], [prevTarget.y, nextTarget.y]),
        };
      } else {
        // Passed this move
        currentZoom = move.zoom;
        currentTarget = nextTarget;
      }
    }
  }

  // Calculate pan offsets so the target remains centered during zoom
  const translateX = (0.5 - currentTarget.x) * viewportWidth * (currentZoom - 1);
  const translateY = (0.5 - currentTarget.y) * viewportHeight * (currentZoom - 1);

  // Subtle 3D tilt based on pan velocity/offset
  const rotateY = (currentTarget.x - 0.5) * -6;
  const rotateX = (currentTarget.y - 0.5) * 4;

  return {
    scale: currentZoom,
    translateX,
    translateY,
    rotateX,
    rotateY,
  };
}
