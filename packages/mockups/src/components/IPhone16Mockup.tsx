import React, { CSSProperties } from 'react';

export interface IPhone16MockupProps {
  children: React.ReactNode;
  chassisColor?: 'natural-titanium' | 'black-titanium' | 'white-titanium' | 'clay';
  shadow?: boolean;
  style?: CSSProperties;
}

export const IPhone16Mockup: React.FC<IPhone16MockupProps> = ({
  children,
  chassisColor = 'natural-titanium',
  shadow = true,
  style = {},
}) => {
  const isClay = chassisColor === 'clay';
  const isBlack = chassisColor === 'black-titanium';
  const isWhite = chassisColor === 'white-titanium';

  const titaniumBorder = isClay
    ? '#E5E7EB'
    : isBlack
    ? 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #27272A 100%)'
    : isWhite
    ? 'linear-gradient(135deg, #F4F4F5 0%, #D4D4D8 50%, #E4E4E7 100%)'
    : 'linear-gradient(135deg, #A8A29E 0%, #78716C 50%, #8D8580 100%)'; // Natural Titanium

  return (
    <div
      style={{
        position: 'relative',
        width: '380px',
        height: '780px',
        margin: '0 auto',
        padding: '12px',
        borderRadius: '56px',
        background: titaniumBorder,
        boxShadow: shadow
          ? '0 30px 80px -20px rgba(0, 0, 0, 0.85), inset 0 1px 2px rgba(255, 255, 255, 0.4), inset 0 -1px 2px rgba(0, 0, 0, 0.4)'
          : undefined,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Outer Titanium Edge Chamfer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '46px',
          backgroundColor: '#000000',
          padding: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '110px',
            height: '32px',
            backgroundColor: '#000000',
            borderRadius: '20px',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Camera Lens */}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#0A0A10',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          />
          {/* Sensor Array */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#050508',
            }}
          />
        </div>

        {/* Screen Display Area */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '40px',
            overflow: 'hidden',
            backgroundColor: '#090A0F',
          }}
        >
          {children}

          {/* Curved Glass Specular Highlight Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 60%)',
              pointerEvents: 'none',
              borderRadius: '40px 40px 0 0',
            }}
          />
        </div>
      </div>
    </div>
  );
};
