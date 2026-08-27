import React from 'react';
import { useCurrentFrame } from 'remotion';

export const DemoDashboardUI: React.FC = () => {
  const frame = useCurrentFrame();

  // Animated metric counter
  const videoMinutes = Math.min(1420, Math.round(980 + frame * 3.5));
  const gpuUsage = Math.min(96, Math.round(65 + Math.sin(frame * 0.1) * 15));

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#0F111A',
        color: '#FFFFFF',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '240px',
          backgroundColor: '#161824',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366F1, #EC4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '16px',
              }}
            >
              M
            </div>
            <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em' }}>
              MotionPictures
            </span>
          </div>

          {/* Navigation links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { name: 'Dashboard', active: true },
              { name: 'Storyboards', active: false },
              { name: 'Telemetry Harvester', active: false },
              { name: 'Device Mockups', active: false },
              { name: 'Edge-TTS Voices', active: false },
              { name: 'Render Pipeline', active: false },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: item.active ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: item.active ? '#818CF8' : '#94A3B8',
                  fontWeight: item.active ? 600 : 500,
                  fontSize: '13px',
                  border: item.active ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* User Card */}
        <div
          style={{
            padding: '12px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.06)',
            fontSize: '12px',
            color: '#94A3B8',
          }}
        >
          <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Pro Enterprise</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Cluster: GPU-Accelerated</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#13141F',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Telemetry & Production Hub</h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
              Realtime automated screen capture & Remotion composition pipeline
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34D399',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                }}
              />
              Pipeline Active
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 3 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div
              style={{
                padding: '18px',
                borderRadius: '12px',
                backgroundColor: '#1A1C29',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Total Video Minutes</div>
              <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '6px', color: '#6366F1' }}>
                {videoMinutes.toLocaleString()} min
              </div>
              <div style={{ fontSize: '11px', color: '#34D399', marginTop: '4px' }}>+34% vs last week</div>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '12px',
                backgroundColor: '#1A1C29',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>Edge-TTS Word Sync</div>
              <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '6px', color: '#A855F7' }}>
                99.98%
              </div>
              <div style={{ fontSize: '11px', color: '#34D399', marginTop: '4px' }}>Zero Drift Calibration</div>
            </div>

            <div
              style={{
                padding: '18px',
                borderRadius: '12px',
                backgroundColor: '#1A1C29',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>GPU Acceleration</div>
              <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '6px', color: '#EC4899' }}>
                {gpuUsage}%
              </div>
              <div style={{ fontSize: '11px', color: '#60A5FA', marginTop: '4px' }}>60 FPS Native Headless</div>
            </div>
          </div>

          {/* SVG Animated Chart */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#1A1C29',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '18px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Telemetry Throughput (Frames / Sec)</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Live DevTools Protocol Stream</div>
            </div>

            {/* Vector Wave Graph */}
            <div style={{ flex: 1, position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,150 Q100,60 200,90 T400,40 T600,100 T800,30 L800,200 L0,200 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,150 Q100,60 200,90 T400,40 T600,100 T800,30"
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
