import React, { CSSProperties } from 'react';

export interface SafariBrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  title?: string;
  theme?: 'dark' | 'light' | 'glass';
  shadow?: boolean;
  style?: CSSProperties;
}

export const SafariBrowserFrame: React.FC<SafariBrowserFrameProps> = ({
  children,
  url = 'https://app.motionpictures.dev/dashboard',
  title = 'MotionPictures Studio',
  theme = 'glass',
  shadow = true,
  style = {},
}) => {
  const isDark = theme === 'dark' || theme === 'glass';

  const headerBg =
    theme === 'glass'
      ? 'rgba(28, 30, 42, 0.75)'
      : isDark
      ? '#1E202E'
      : '#F1F3F9';

  const borderColor =
    theme === 'glass'
      ? 'rgba(255, 255, 255, 0.12)'
      : isDark
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.08)';

  const searchBg =
    theme === 'glass'
      ? 'rgba(0, 0, 0, 0.35)'
      : isDark
      ? '#13141F'
      : '#FFFFFF';

  const textColor = isDark ? '#E2E8F0' : '#334155';
  const subtextColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${borderColor}`,
        backgroundColor: isDark ? '#0F111A' : '#FFFFFF',
        backdropFilter: theme === 'glass' ? 'blur(20px)' : undefined,
        boxShadow: shadow
          ? '0 25px 60px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05)'
          : undefined,
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          backgroundColor: headerBg,
          borderBottom: `1px solid ${borderColor}`,
          userSelect: 'none',
        }}
      >
        {/* macOS Window Controls (Traffic Lights) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '80px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#FF5F56',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#FFBD2E',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#27C93F',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* URL Bar */}
        <div
          style={{
            flex: 1,
            maxWidth: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '8px',
            backgroundColor: searchBg,
            border: `1px solid ${borderColor}`,
            fontSize: '13px',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: textColor,
          }}
        >
          {/* Lock Icon */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={subtextColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{ color: subtextColor }}>{url}</span>
        </div>

        {/* Window Title or Action Badges */}
        <div
          style={{
            width: '80px',
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '12px',
            color: subtextColor,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {title}
        </div>
      </div>

      {/* Screen Viewport */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          backgroundColor: isDark ? '#090A0F' : '#F8FAFC',
        }}
      >
        {children}
      </div>
    </div>
  );
};
