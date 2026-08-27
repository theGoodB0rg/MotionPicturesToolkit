#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { audioGenerateCommand } from './commands/audioGenerate.js';
import { recordCommand } from './commands/record.js';
import { renderCommand, previewCommand } from './commands/render.js';

const program = new Command();

program
  .name('motion-pictures')
  .description('Scalable, modular, programmatic motion graphics & promo video pipeline')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize MotionPicturesToolkit in an existing project or directory')
  .option('-n, --name <name>', 'Project name')
  .action(async (options) => {
    await initCommand(options);
  });

program
  .command('record')
  .description('Record automated web or mobile UI interaction flow')
  .option('-u, --url <url>', 'Target URL to record', 'http://localhost:3000')
  .option('-o, --output <dir>', 'Output directory for assets')
  .action(async (options) => {
    await recordCommand(options);
  });

program
  .command('preview')
  .description('Launch the interactive Remotion Motion Studio')
  .action(async () => {
    await previewCommand();
  });

program
  .command('render')
  .description('Render high-converting master promo video')
  .option('-o, --out <path>', 'Output video path', './dist/promo.mp4')
  .action(async (options) => {
    await renderCommand(options);
  });

program
  .command('audio:generate')
  .description('Synthesize neural voiceover and word boundary timestamps using Edge-TTS')
  .option('-t, --text <text>', 'Text to synthesize')
  .option('-s, --script <file>', 'Path to script text file')
  .option('-v, --voice <voice>', 'Edge-TTS voice name', 'en-US-ChristopherNeural')
  .option('-f, --filename <filename>', 'Output audio filename (without extension)', 'voiceover')
  .option('-o, --output <dir>', 'Output directory')
  .action(async (options) => {
    await audioGenerateCommand(options);
  });

program.parse(process.argv);
