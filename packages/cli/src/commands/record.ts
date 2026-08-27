import fs from 'node:fs';
import path from 'node:path';
import { PlaywrightHarvester } from '@motion-pictures/capture';

export interface RecordOptions {
  url?: string;
  scenarioFile?: string;
  outputDir?: string;
}

export async function recordCommand(options: RecordOptions = {}): Promise<void> {
  const url = options.url || 'http://localhost:3000';
  const outputDir = options.outputDir || path.join(process.cwd(), 'assets', 'raw');

  console.log(`🎥 Initiating automated capture on: ${url}...`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const harvester = new PlaywrightHarvester({
    baseUrl: url,
    outputVideoPath: path.join(outputDir, 'screen-capture.mp4'),
    outputTelemetryPath: path.join(outputDir, 'telemetry.json'),
  });

  const telemetry = await harvester.runScenario(async ({ capture }) => {
    await capture.checkpoint('App Initialized');
    await capture.smoothClick({}, { label: 'Explore Features', zoomFactor: 1.35 });
    await capture.smoothType({}, 'NextGen Marketing Motion', { wpm: 90 });
    await capture.highlight({}, { badgeText: 'Realtime Analytics', durationFrames: 90 });
  });

  const telemetryPath = path.join(outputDir, 'capture-trace.json');
  fs.writeFileSync(telemetryPath, JSON.stringify(telemetry, null, 2), 'utf-8');

  console.log(`✅ Telemetry trace captured with ${telemetry.cursorTrail.length} waypoints.`);
  console.log(`✅ Saved to: ${telemetryPath}`);
}
