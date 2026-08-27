import { chromium } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

async function generateVideoPoster() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const rawFramePath = path.resolve('assets/demo/raw_frame.png');
  const base64Image = fs.readFileSync(rawFramePath).toString('base64');
  const imgSrc = `data:image/png;base64,${base64Image}`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1920px;
        height: 1080px;
        position: relative;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #000;
      }
      .bg-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .dark-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.7) 100%);
      }

      /* Top Title Bar */
      .top-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 28px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
        color: #fff;
        z-index: 10;
      }
      .title-group {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .app-badge {
        background: rgba(99, 102, 241, 0.25);
        border: 1px solid rgba(99, 102, 241, 0.6);
        color: #A5B4FC;
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      .video-title {
        font-size: 26px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #F8FAFC;
        text-shadow: 0 2px 10px rgba(0,0,0,0.7);
      }
      .top-badges {
        display: flex;
        gap: 12px;
      }
      .pill-tag {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(12px);
        padding: 6px 16px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        color: #E2E8F0;
      }

      /* Centered YouTube / Apple Style Play Button */
      .play-container {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        z-index: 20;
      }
      .play-btn {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        background: rgba(15, 23, 42, 0.75);
        border: 2px solid rgba(255, 255, 255, 0.35);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 50px rgba(99, 102, 241, 0.5), 0 20px 40px rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
      }
      .play-btn::after {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        border: 2px solid rgba(99, 102, 241, 0.5);
        animation: pulse 2s infinite;
      }
      .play-icon {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 22px 0 22px 38px;
        border-color: transparent transparent transparent #FFFFFF;
        margin-left: 8px;
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
      }
      .watch-banner {
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid rgba(99, 102, 241, 0.5);
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        backdrop-filter: blur(16px);
        padding: 12px 28px;
        border-radius: 9999px;
        color: #FFFFFF;
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.01em;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .sound-icon {
        color: #818CF8;
      }

      /* Bottom Scrubber & Controls Bar */
      .bottom-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px 40px 28px 40px;
        background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
        display: flex;
        flex-direction: column;
        gap: 14px;
        z-index: 10;
      }
      .progress-bar-bg {
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 3px;
        position: relative;
      }
      .progress-bar-fill {
        width: 32%;
        height: 100%;
        background: linear-gradient(90deg, #6366F1, #EC4899);
        border-radius: 3px;
        position: relative;
      }
      .progress-head {
        position: absolute;
        right: -6px;
        top: -4px;
        width: 14px;
        height: 14px;
        background: #FFFFFF;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(236, 72, 153, 0.8);
      }
      .controls-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #CBD5E1;
        font-size: 17px;
        font-weight: 500;
      }
      .controls-left, .controls-right {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .time-display {
        font-family: monospace;
        font-size: 16px;
        color: #F1F5F9;
      }
      .hd-badge {
        background: rgba(255,255,255,0.15);
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 700;
        color: #F8FAFC;
      }
    </style>
  </head>
  <body>
    <img src="${imgSrc}" class="bg-image" />
    <div class="dark-overlay"></div>

    <!-- Top Bar -->
    <div class="top-bar">
      <div class="title-group">
        <span class="app-badge">MotionPicturesToolkit</span>
        <span class="video-title">Automated Product Promo (Full HD · 60 FPS)</span>
      </div>
      <div class="top-badges">
        <span class="pill-tag">Neural Voiceover</span>
        <span class="pill-tag">Kinetic Subtitles</span>
        <span class="pill-tag">3D MacBook Pro</span>
      </div>
    </div>

    <!-- Center Play Button -->
    <div class="play-container">
      <div class="play-btn">
        <div class="play-icon"></div>
      </div>
      <div class="watch-banner">
        <span>Click to Watch 30s Promo with Audio</span>
        <span class="sound-icon">🔊</span>
      </div>
    </div>

    <!-- Bottom Controls -->
    <div class="bottom-bar">
      <div class="progress-bar-bg">
        <div class="progress-bar-fill">
          <div class="progress-head"></div>
        </div>
      </div>
      <div class="controls-row">
        <div class="controls-left">
          <span>▶</span>
          <span>🔊</span>
          <span class="time-display">0:10 / 0:30</span>
        </div>
        <div class="controls-right">
          <span class="hd-badge">1080p 60fps</span>
          <span>⚙️</span>
          <span>⛶</span>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html);
  const outPath = path.resolve('assets/demo/video_poster.png');
  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();

  console.log(`✅ High-resolution video poster created: ${outPath}`);
}

generateVideoPoster().catch(console.error);
