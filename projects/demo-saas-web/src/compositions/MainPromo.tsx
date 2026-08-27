import React from 'react';
import { useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import {
  CinematicCanvas,
  SceneSequence,
} from '@motion-pictures/core';
import { DeviceContainer } from '@motion-pictures/mockups';
import {
  MeshGradientBackground,
  KineticHeadline,
  PillCallout,
  CursorPointer,
  BentoGrid,
  SpotlightOverlay,
} from '@motion-pictures/motion';
import { KineticSubtitles, calculateDuckingVolume, WordTimestamp } from '@motion-pictures/audio';
import { DemoDashboardUI } from '../components/DemoDashboardUI';
import storyboard from '../../storyboard';
import timestampsData from '../../public/audio/voiceover_timestamps.json';

const MASTER_WORDS: WordTimestamp[] = timestampsData.words;

export const MainPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scene1 = storyboard.scenes[0];
  const scene2 = storyboard.scenes[1];
  const scene3 = storyboard.scenes[2];
  const scene4 = storyboard.scenes[3];

  const s1Frames = Math.round(scene1.durationSeconds * fps);
  const s2Frames = Math.round(scene2.durationSeconds * fps);
  const s3Frames = Math.round(scene3.durationSeconds * fps);
  const s4Frames = Math.round(scene4.durationSeconds * fps);

  // Active scene camera
  let activeCamera = undefined;
  if (frame >= s1Frames && frame < s1Frames + s2Frames && scene2.type === 'app-demo') {
    activeCamera = scene2.camera;
  }

  // Dynamic Audio Ducking Calculation
  const duckingVolume = calculateDuckingVolume({
    frame,
    fps,
    speechSegments: [
      { startFrame: 0, durationFrames: s1Frames + s2Frames + s3Frames + s4Frames },
    ],
    duckingOptions: {
      baseVolume: 0.65,
      duckedVolume: 0.18,
      rampFrames: 15,
    },
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Animated Mesh Gradient Background */}
      <MeshGradientBackground
        theme="dark"
        primaryColor="#4F46E5"
        secondaryColor="#9333EA"
        accentColor="#EC4899"
      />

      {/* Main Composition Canvas with Virtual Director Camera */}
      <CinematicCanvas camera={activeCamera} vignette={true}>
        {/* SCENE 1: HOOK */}
        <SceneSequence scene={scene1} fromFrame={0} durationInFrames={s1Frames}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 80px',
            }}
          >
            {scene1.type === 'hook' && (
              <KineticHeadline
                title={scene1.title}
                subtitle={scene1.subtitle}
                badgeText={scene1.badgeText}
                highlightWord="Cinematic"
                fontSize={72}
              />
            )}
          </div>
        </SceneSequence>

        {/* SCENE 2: LIVE APP DEMO & 3D MOCKUP */}
        <SceneSequence scene={scene2} fromFrame={s1Frames} durationInFrames={s2Frames}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 100px',
            }}
          >
            <DeviceContainer
              device={scene2.type === 'app-demo' ? scene2.device : 'macbook-pro-16'}
              material="photorealistic"
              style={{ width: '1280px', height: '760px' }}
            >
              <DemoDashboardUI />
            </DeviceContainer>

            {/* Floating Callout Badges */}
            <PillCallout
              text="Instant Telemetry Capture"
              atFrame={60}
              durationFrames={220}
              position="top-left"
              accentColor="#6366F1"
            />
            <PillCallout
              text="Sub-Pixel Smooth Zoom"
              atFrame={180}
              durationFrames={220}
              position="bottom-right"
              accentColor="#EC4899"
            />

            {/* Screen Studio Smooth Cursor */}
            <CursorPointer
              waypoints={[
                { atFrame: 30, x: 400, y: 700 },
                { atFrame: 100, x: 1100, y: 350, click: true },
                { atFrame: 220, x: 800, y: 550, click: true },
                { atFrame: 320, x: 960, y: 450 },
              ]}
            />

            {/* Spotlight Focus on Analytics */}
            <SpotlightOverlay
              active={true}
              atFrame={90}
              durationFrames={140}
              focusArea={{ x: 65, y: 40, radius: 280 }}
            />
          </div>
        </SceneSequence>

        {/* SCENE 3: FEATURE BENTO GRID */}
        <SceneSequence
          scene={scene3}
          fromFrame={s1Frames + s2Frames}
          durationInFrames={s3Frames}
        >
          {scene3.type === 'bento' && (
            <BentoGrid
              headline={scene3.headline}
              subheadline={scene3.subheadline}
              items={scene3.items}
            />
          )}
        </SceneSequence>

        {/* SCENE 4: CALL TO ACTION */}
        <SceneSequence
          scene={scene4}
          fromFrame={s1Frames + s2Frames + s3Frames}
          durationInFrames={s4Frames}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Inter, system-ui, sans-serif',
              textAlign: 'center',
              padding: '0 80px',
            }}
          >
            {scene4.type === 'cta' && (
              <>
                <KineticHeadline
                  title={scene4.title}
                  subtitle={scene4.subtitle}
                  badgeText="Ready in 5 Minutes"
                  highlightWord="Cinema"
                  fontSize={68}
                />

                {/* Glowing Terminal Install Command Pill */}
                <div
                  style={{
                    marginTop: '36px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 32px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(99, 102, 241, 0.6)',
                    boxShadow: '0 0 35px rgba(99, 102, 241, 0.4)',
                    color: '#818CF8',
                    fontSize: '22px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                  }}
                >
                  <span style={{ color: '#34D399' }}>$</span>
                  <span>{scene4.ctaButtonText}</span>
                </div>

                {scene4.brandUrl && (
                  <div
                    style={{
                      marginTop: '24px',
                      color: '#94A3B8',
                      fontSize: '16px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {scene4.brandUrl}
                  </div>
                )}
              </>
            )}
          </div>
        </SceneSequence>
      </CinematicCanvas>

      {/* Kinetic Karaoke Subtitles Synchronized with Edge-TTS */}
      <KineticSubtitles
        words={MASTER_WORDS}
        startFrame={0}
        preset="karaoke-glow"
        highlightColor="#6366F1"
      />

      {/* Neural Voiceover Audio Track */}
      <Audio src={staticFile('audio/voiceover.mp3')} volume={1.0} />

      {/* Background Synthwave Soundtrack with Dynamic Ducking */}
      <Audio src={staticFile('audio/music.wav')} volume={duckingVolume} />
    </div>
  );
};
