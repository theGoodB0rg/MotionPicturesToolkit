# Integration Guide: Integrating MotionPicturesToolkit with Any Repository

This guide provides step-by-step instructions on how external web and mobile repositories can integrate `MotionPicturesToolkit` to produce automated, high-converting product videos.

---

## 1. Quick Integration Workflow

Integrating `MotionPicturesToolkit` into an existing codebase takes under 5 minutes:

```bash
# 1. Initialize MotionPicturesToolkit in your project
npx @motion-pictures/cli init

# 2. Record your live web or mobile app flow
npx @motion-pictures/cli record --url http://localhost:3000

# 3. Preview your motion graphics composition in the interactive studio
npx @motion-pictures/cli preview

# 4. Render production-ready 4K 60fps MP4
npx @motion-pictures/cli render --out ./dist/product-launch.mp4
```

---

## 2. Configuration (`motion.config.ts`)

When initialized in a project repository, a `motion.config.ts` file is generated at the root:

```typescript
import { defineConfig } from '@motion-pictures/core';

export default defineConfig({
  project: {
    name: 'My SaaS Product Promo',
    slug: 'my-saas-promo',
  },
  video: {
    width: 1920,
    height: 1080,
    fps: 60,
    durationInSeconds: 30,
  },
  branding: {
    primaryColor: '#6366F1',
    accentColor: '#EC4899',
    fontFamily: 'Inter, sans-serif',
    logo: './assets/brand/logo.svg',
    theme: 'dark', // 'dark' | 'light' | 'midnight'
  },
  capture: {
    target: 'web', // 'web' | 'mobile-ios' | 'mobile-android'
    baseUrl: 'http://localhost:3000',
    viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    scenario: './scripts/capture-flow.ts',
  },
  audio: {
    voiceover: {
      provider: 'edge-tts', // 'edge-tts' (free / zero-config) | 'elevenlabs' | 'openai'
      voice: 'en-US-ChristopherNeural', // e.g. en-US-JennyNeural, en-US-GuyNeural, en-GB-SoniaNeural
      rate: '+0%',
      pitch: '+0Hz',
    },
    backgroundMusic: './assets/audio/synthwave-uplifting.mp3',
    musicDuckingDb: -14,
    enableSfx: true,
  },
  mockup: {
    defaultDevice: 'macbook-pro-16', // 'macbook-pro-16' | 'iphone-16-pro' | 'safari-browser' | 'none'
    material: 'clay', // 'photorealistic' | 'clay' | 'glass'
    shadows: true,
    background: 'mesh-gradient', // 'mesh-gradient' | 'particles' | 'solid'
  },
});
```

---

## 3. Automated Capture Scenario (`scripts/capture-flow.ts`)

Define deterministic user interactions using standard Playwright syntax:

```typescript
import { defineScenario } from '@motion-pictures/capture';

export default defineScenario(async ({ page, capture }) => {
  // Navigate to target landing page or dashboard
  await page.goto('/dashboard');
  await capture.checkpoint('Dashboard Loaded');

  // Smoothly hover and click the create project button
  const createButton = page.locator('button[data-testid="create-project"]');
  await capture.smoothClick(createButton, {
    label: 'Click Create Project',
    zoomFactor: 1.4, // Camera will auto-zoom into this button
  });

  // Type in project title with simulated realistic keystrokes
  const titleInput = page.locator('input[name="title"]');
  await capture.smoothType(titleInput, 'NextGen AI Motion Pipeline', {
    wpm: 85,
    triggerSfx: 'keyboard-click',
  });

  // Wait for result visualization
  await page.locator('.analytics-chart').waitFor({ state: 'visible' });
  await capture.highlight(page.locator('.analytics-chart'), {
    badgeText: 'Instant Realtime Analytics',
    durationFrames: 120,
  });
});
```

---

## 4. Declarative Storyboard (`storyboard.ts`)

Choreograph your scenes, kinetic typography, voiceover, and camera zooms in a clean declarative file:

```typescript
import { defineStoryboard, Scene } from '@motion-pictures/core';

export default defineStoryboard([
  Scene.Hook({
    durationSeconds: 5,
    title: 'Transform Code into Cinema',
    subtitle: 'Automated 4K product videos in minutes',
    voiceover: 'Stop spending weeks manually editing product launch videos.',
    transition: 'fade-through-black',
  }),

  Scene.AppDemo({
    durationSeconds: 12,
    source: './assets/raw/dashboard-capture.mp4',
    device: 'macbook-pro-16',
    camera: {
      initialZoom: 1.0,
      moves: [
        { atFrame: 60, zoom: 1.5, target: 'center-right', duration: 45 },
        { atFrame: 200, zoom: 1.1, target: 'center', duration: 30 },
      ],
    },
    callouts: [
      { atFrame: 80, text: 'One-Click Deploy', position: 'top-left' },
      { atFrame: 180, text: '10x Faster Pipeline', position: 'bottom-right' },
    ],
    voiceover: 'MotionPicturesToolkit automatically records your app and generates studio-grade animations.',
  }),

  Scene.CallToAction({
    durationSeconds: 5,
    title: 'Get Started Today',
    ctaButton: 'npx motion-pictures init',
    voiceover: 'Integrate into your codebase today and supercharge your user acquisition.',
  }),
]);
```

---

## 5. Continuous Integration (CI/CD GitHub Action)

Automate video generation whenever a release is tagged:

```yaml
name: Generate Product Release Video

on:
  push:
    tags:
      - 'v*'

jobs:
  render-video:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build and launch local app server
        run: |
          npm run build
          npm run start &
          npx wait-on http://localhost:3000

      - name: Generate Promo Video
        env:
          ELEVENLABS_API_KEY: ${{ secrets.ELEVENLABS_API_KEY }}
        run: |
          npx motion-pictures record --url http://localhost:3000
          npx motion-pictures render --out ./dist/release-promo.mp4

      - name: Upload Video Artifact
        uses: actions/upload-artifact@v4
        with:
          name: release-promo-video
          path: ./dist/release-promo.mp4
```
