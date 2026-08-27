import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export interface MeshGradientBackgroundProps {
  theme?: 'dark' | 'light' | 'midnight' | 'cyberpunk' | 'minimal';
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  showGrid?: boolean;
  showNoise?: boolean;
  style?: CSSProperties;
}

export const MeshGradientBackground: React.FC<MeshGradientBackgroundProps> = ({
  theme = 'dark',
  primaryColor = '#4F46E5', // Indigo
  secondaryColor = '#9333EA', // Purple
  accentColor = '#EC4899', // Pink
  showGrid = true,
  showNoise = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const time = frame / fps;

  // Orbiting coordinates for ambient radial gradients
  const blob1X = 50 + Math.sin(time * 0.5) * 20;
  const blob1Y = 30 + Math.cos(time * 0.4) * 15;

  const blob2X = 70 + Math.cos(time * 0.6) * 25;
  const blob2Y = 70 + Math.sin(time * 0.5) * 20;

  const blob3X = 20 + Math.sin(time * 0.3) * 15;
  const blob3Y = 80 + Math.cos(time * 0.6) * 15;

  const baseBg =
    theme === 'light'
      ? '#F8FAFC'
      : theme === 'midnight'
      ? '#05070E'
      : theme === 'cyberpunk'
      ? '#0B0014'
      : '#090A0F';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: baseBg,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Dynamic Animated Mesh Gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at ${blob1X}% ${blob1Y}%, ${primaryColor}40 0%, transparent 60%),
            radial-gradient(circle at ${blob2X}% ${blob2Y}%, ${secondaryColor}35 0%, transparent 55%),
            radial-gradient(circle at ${blob3X}% ${blob3Y}%, ${accentColor}30 0%, transparent 50%)
          `,
          filter: 'blur(60px)',
          transform: 'scale(1.2)',
        }}
      />

      {/* Subtle Geometric Grid */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
          }}
        />
      )}

      {/* Grain / Noise Texture */}
      {showNoise && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
