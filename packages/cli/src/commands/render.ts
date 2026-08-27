import { execSync } from 'node:child_process';
import path from 'node:path';

export interface RenderOptions {
  out?: string;
  project?: string;
  props?: string;
}

export async function renderCommand(options: RenderOptions = {}): Promise<void> {
  const outFile = options.out || path.join(process.cwd(), 'dist', 'promo.mp4');
  console.log(`🎬 Rendering production video to ${outFile}...`);

  try {
    execSync(`npx remotion render src/index.ts MainPromo ${outFile}`, {
      stdio: 'inherit',
    });
    console.log(`✅ Video rendered successfully: ${outFile}`);
  } catch {
    console.log(`ℹ️ To render directly via Remotion studio: npx remotion render src/index.ts MainPromo ${outFile}`);
  }
}

export async function previewCommand(): Promise<void> {
  console.log(`🚀 Starting Remotion Motion Studio Preview...`);
  try {
    execSync(`npx remotion preview src/index.ts`, {
      stdio: 'inherit',
    });
  } catch {
    console.log(`ℹ️ Run 'npx remotion preview src/index.ts' to launch the studio preview.`);
  }
}
