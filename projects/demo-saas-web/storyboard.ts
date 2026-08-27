import { defineStoryboard, Scene } from '@motion-pictures/core';

export default defineStoryboard([
  // Scene 1: Hook (7.5s)
  Scene.Hook({
    durationSeconds: 7.5,
    title: 'Transform Code into Cinematic Marketing',
    subtitle: 'Stop spending weeks manually editing product videos. Generate studio-grade 4K promos directly from your codebase.',
    badgeText: 'MotionPicturesToolkit 1.0',
    voiceover: 'Stop spending weeks manually editing product videos. Transform your codebase into marketing cinema.',
    transition: 'fade',
  }),

  // Scene 2: Live App Demo (9.0s)
  Scene.AppDemo({
    durationSeconds: 9.0,
    device: 'macbook-pro-16',
    headline: 'Realtime Telemetry & Dynamic Director',
    camera: {
      initialZoom: 1.0,
      moves: [
        { atFrame: 45, zoom: 1.35, target: 'top-right', duration: 45 },
        { atFrame: 220, zoom: 1.15, target: 'center', duration: 40 },
      ],
    },
    callouts: [
      { atFrame: 60, text: 'Instant Telemetry Capture', position: 'top-left' },
      { atFrame: 220, text: 'Sub-Pixel Smooth Zoom', position: 'bottom-right' },
    ],
    voiceover: 'MotionPicturesToolkit automatically captures your app, adds smooth camera zooms, and wraps screens in photorealistic 3D device frames.',
    transition: 'slide-left',
  }),

  // Scene 3: Bento Grid Features (7.0s)
  Scene.FeatureBento({
    durationSeconds: 7.0,
    headline: 'Engineered for Viral Conversions',
    subheadline: 'Every element optimized for user acquisition and product marketing.',
    items: [
      {
        title: 'Zero-Cost Edge TTS',
        description: 'High-fidelity neural voiceovers with word-boundary timestamp sync.',
        stat: '$0',
        statLabel: 'API Cost',
        badge: 'Built-in',
        accentColor: '#10B981',
      },
      {
        title: '3D Device Mockups',
        description: 'iPhone 16 Pro, MacBook Pro, and Glassmorphic Browser frames.',
        stat: '60 FPS',
        statLabel: 'Ultra Smooth',
        badge: 'Three.js / R3F',
        accentColor: '#6366F1',
      },
      {
        title: 'Virtual Director',
        description: 'Automated camera zooming, inertia damping, and spotlight focus.',
        stat: '10x',
        statLabel: 'Faster Production',
        badge: 'ScreenStudio Engine',
        accentColor: '#EC4899',
      },
    ],
    voiceover: 'Powered by zero-cost neural voiceovers, Three.js mockups, and the Virtual Director engine.',
    transition: 'zoom-in',
  }),

  // Scene 4: Call To Action (6.5s)
  Scene.CallToAction({
    durationSeconds: 6.5,
    title: 'Start Creating Cinema from Code',
    subtitle: 'One command to initialize and supercharge your product marketing.',
    ctaButtonText: 'npx motion-pictures init',
    brandUrl: 'https://motionpictures.dev',
    voiceover: 'Run npx motion-pictures init in your repository today and launch your next product video in style.',
    transition: 'fade-through-black',
  }),
]);
