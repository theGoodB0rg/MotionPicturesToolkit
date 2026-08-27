import { defineConfig } from '@motion-pictures/core';

export default defineConfig({
  project: {
    name: 'Nexus AI Motion Promo',
    slug: 'nexus-ai-motion',
    version: '1.0.0',
    description: 'High-converting promo video for Nexus AI Platform',
  },
  video: {
    width: 1920,
    height: 1080,
    fps: 60,
    durationInSeconds: 24,
  },
  branding: {
    primaryColor: '#6366F1', // Indigo
    secondaryColor: '#A855F7', // Purple
    accentColor: '#EC4899', // Pink
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
