import { interpolate, spring } from 'remotion';

export interface SpringPhysicsConfig {
  damping?: number;
  mass?: number;
  stiffness?: number;
  overshootClamping?: boolean;
}

export const SPRING_PRESETS = {
  snappy: { damping: 15, mass: 0.5, stiffness: 180 },
  smooth: { damping: 20, mass: 1, stiffness: 100 },
  gentle: { damping: 30, mass: 1.5, stiffness: 80 },
  bouncy: { damping: 10, mass: 0.8, stiffness: 150 },
  cinematic: { damping: 28, mass: 1.2, stiffness: 90 },
} as const;

/**
 * Calculates a spring animation value scaled between outputMin and outputMax
 */
export function calculateSpringValue(options: {
  frame: number;
  fps: number;
  delay?: number;
  config?: SpringPhysicsConfig | keyof typeof SPRING_PRESETS;
  from?: number;
  to?: number;
}): number {
  const {
    frame,
    fps,
    delay = 0,
    config = 'smooth',
    from = 0,
    to = 1,
  } = options;

  const springConfig =
    typeof config === 'string' ? SPRING_PRESETS[config] : config;

  const springProgress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: springConfig,
  });

  return interpolate(springProgress, [0, 1], [from, to]);
}

/**
 * Staggered delay calculator for list and character animations
 */
export function getStaggerDelay(index: number, staggerStepFrames: number = 3): number {
  return index * staggerStepFrames;
}

/**
 * Smoothly clamps a number within a range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two numbers
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
