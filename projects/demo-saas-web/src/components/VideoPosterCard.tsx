import React from 'react';
import { MainPromo } from '../compositions/MainPromo';

export const VideoPosterCard: React.FC = () => {
  return (
    <div style={{ width: 1920, height: 1080, position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      {/* Background Frame Render */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <MainPromo />
      </div>

      {/* Subtle Radial Vignette Darkness */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Title Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '32px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#FFFFFF',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              background: 'rgba(99, 102, 241, 0.25)',
              border: '1px solid rgba(99, 102, 241, 0.6)',
              color: '#A5B4FC',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            MotionPicturesToolkit
          </span>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F8FAFC',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            Automated Product Promo (1080p 60fps)
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <span
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#E2E8F0',
            }}
          >
            Neural Voiceover
          </span>
          <span
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#E2E8F0',
            }}
          >
            3D Hardware Mockup
          </span>
        </div>
      </div>

      {/* Center Large Glassmorphic Play Button */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          zIndex: 20,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            width: '136px',
            height: '136px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '2px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 0 60px rgba(99, 102, 241, 0.6), 0 20px 50px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '24px 0 24px 40px',
              borderColor: 'transparent transparent transparent #FFFFFF',
              marginLeft: '8px',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(99, 102, 241, 0.6)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
            padding: '12px 28px',
            borderRadius: '9999px',
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span>Click to Watch 30s Master Promo</span>
          <span style={{ color: '#818CF8' }}>🔊</span>
        </div>
      </div>

      {/* Bottom Scrubber & Controls Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 48px 32px 48px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          zIndex: 10,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '3px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '35%',
              height: '100%',
              background: 'linear-gradient(90deg, #6366F1, #EC4899)',
              borderRadius: '3px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: '-6px',
                top: '-4px',
                width: '14px',
                height: '14px',
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(236, 72, 153, 0.9)',
              }}
            />
          </div>
        </div>

        {/* Controls Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#CBD5E1',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span>▶</span>
            <span>🔊</span>
            <span style={{ fontFamily: 'monospace', fontSize: '16px', color: '#F1F5F9' }}>
              0:10 / 0:30
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#F8FAFC',
              }}
            >
              1080p 60fps
            </span>
            <span>⚙</span>
            <span>⛶</span>
          </div>
        </div>
      </div>
    </div>
  );
};
