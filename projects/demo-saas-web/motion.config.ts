import { defineConfig } from '@motion-pictures/core';

export default defineConfig({
  project: {
    name: 'MotionPictures Launch Promo',
    slug: 'motion-pictures-promo',
    version: '1.0.0',
    description: 'High-converting 4K product launch video for MotionPicturesToolkit',
  },
  video: {
    width: 1920,
    height: 1080,
    fps: 60,
    durationInSeconds: 30,
  },
  branding: {
    primaryColor: '#6366F1',
    secondaryColor: '#A855F7',
    accentColor: '#EC4899',
    fontFamily: 'Inter, system-ui, sans-serif',
    theme: 'dark',
  },
  audio: {
    voiceover: {
      provider: 'edge-tts',
      voice: 'en-US-ChristopherNeural',
      rate: '+0%',
      pitch: '+0Hz',
    },
    backgroundMusic: './audio/music.wav',
    musicDuckingDb: -14,
    enableSfx: true,
  },
  mockup: {
    defaultDevice: 'macbook-pro-16',
    material: 'photorealistic',
    shadows: true,
    background: 'mesh-gradient',
  },
});
