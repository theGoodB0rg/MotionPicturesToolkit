import { defineStoryboard, Scene } from '@motion-pictures/core';

export default defineStoryboard([
  // Scene 1: Hook (5s)
  Scene.Hook({
    durationSeconds: 5,
    title: 'Transform Code into Cinematic Marketing',
    subtitle: 'Generate studio-grade 4K motion graphics & product promos directly from your codebase.',
    badgeText: 'MotionPicturesToolkit 1.0',
    voiceover: 'Stop spending days manually editing product launch videos for your apps.',
    transition: 'fade',
  }),

  // Scene 2: Live App Demo (8s)
  Scene.AppDemo({
    durationSeconds: 8,
    device: 'macbook-pro-16',
    headline: 'Realtime Telemetry & Dynamic Director',
    camera: {
      initialZoom: 1.0,
      moves: [
        { atFrame: 45, zoom: 1.35, target: 'top-right', duration: 40 },
        { atFrame: 180, zoom: 1.15, target: 'center', duration: 35 },
      ],
    },
    callouts: [
      { atFrame: 60, text: 'Instant Telemetry Capture', position: 'top-left' },
      { atFrame: 190, text: 'Sub-Pixel Smooth Zoom', position: 'bottom-right' },
    ],
    voiceover: 'MotionPicturesToolkit automatically records your application flows, creates smooth camera pans, and wraps screens in photorealistic 3D device frames.',
    transition: 'slide-left',
  }),

  // Scene 3: Bento Grid Features (6s)
  Scene.FeatureBento({
    durationSeconds: 6,
    headline: 'Engineered for Viral Conversions',
    subheadline: 'Every element optimized for user acquisition and product marketing.',
    items: [
      {
        title: 'Zero-Cost Edge TTS',
        description: 'High-fidelity neural voiceovers with word-boundary timestamp sync.',
        stat: '0$',
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
    voiceover: 'With zero-cost Edge-TTS voiceovers, 3D device mockups, and the Virtual Director camera engine, your product stands out.',
    transition: 'zoom-in',
  }),

  // Scene 4: Call To Action (5s)
  Scene.CallToAction({
    durationSeconds: 5,
    title: 'Start Creating Cinema from Code',
    subtitle: 'One command to initialize and supercharge your product launch.',
    ctaButtonText: 'npx motion-pictures init',
    brandUrl: 'https://motionpictures.dev',
    voiceover: 'Run npx motion-pictures init in your repo today and launch your next big product video.',
    transition: 'fade-through-black',
  }),
]);
