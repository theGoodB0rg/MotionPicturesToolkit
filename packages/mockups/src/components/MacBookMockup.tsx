import React, { CSSProperties } from 'react';

export interface MacBookMockupProps {
  children: React.ReactNode;
  chassisColor?: 'space-black' | 'silver' | 'clay';
  shadow?: boolean;
  style?: CSSProperties;
}

export const MacBookMockup: React.FC<MacBookMockupProps> = ({
  children,
  chassisColor = 'space-black',
  shadow = true,
  style = {},
}) => {
  const isClay = chassisColor === 'clay';
  const isSilver = chassisColor === 'silver';

  const bodyBg = isClay
    ? '#E5E7EB'
    : isSilver
    ? 'linear-gradient(180deg, #D4D4D8 0%, #A1A1AA 100%)'
    : 'linear-gradient(180deg, #27272A 0%, #18181B 100%)';

  const bezelBorder = isClay
    ? 'rgba(0,0,0,0.06)'
    : 'rgba(255,255,255,0.08)';

  const screenBezelBg = '#0B0B0E';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        maxWidth: '1280px',
        maxHeight: '800px',
        margin: '0 auto',
        ...style,
      }}
    >
      {/* MacBook Screen Lid */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          backgroundColor: screenBezelBg,
          borderRadius: '18px 18px 0 0',
          padding: '14px 14px 0 14px',
          border: `2px solid ${bezelBorder}`,
          boxShadow: shadow
            ? '0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            : undefined,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Camera Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '130px',
            height: '18px',
            backgroundColor: screenBezelBg,
            borderRadius: '0 0 10px 10px',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {/* Camera Lens */}
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#040406',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          />
          {/* Green Indicator LED (subtle) */}
          <div
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.6)',
            }}
          />
        </div>

        {/* Display Panel */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            backgroundColor: '#000000',
            borderRadius: '8px 8px 0 0',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>

      {/* MacBook Bottom Base / Chassis */}
      <div
        style={{
          position: 'relative',
          width: '112%',
          height: '24px',
          background: bodyBg,
          borderRadius: '0 0 18px 18px',
          boxShadow:
            '0 15px 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Thumb Opening Notch */}
        <div
          style={{
            width: '120px',
            height: '6px',
            backgroundColor: isClay ? '#D1D5DB' : '#0B0B0E',
            borderRadius: '0 0 6px 6px',
            borderTop: `1px solid ${bezelBorder}`,
          }}
        />
      </div>

      {/* Ground Reflection / Ambient Floor Shadow */}
      {shadow && (
        <div
          style={{
            width: '90%',
            height: '18px',
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 75%)',
            marginTop: '4px',
          }}
        />
      )}
    </div>
  );
};
