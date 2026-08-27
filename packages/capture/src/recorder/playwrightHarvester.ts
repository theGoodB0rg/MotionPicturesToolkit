import { InteractionTrace } from '../types/telemetry.js';
import { ScenarioFunction, ScenarioHarness } from '../scenario/defineScenario.js';

export interface HarvesterOptions {
  baseUrl?: string;
  viewport?: { width: number; height: number; deviceScaleFactor?: number };
  outputVideoPath?: string;
  outputTelemetryPath?: string;
  projectSlug?: string;
  fps?: number;
}

export class PlaywrightHarvester {
  private options: HarvesterOptions;

  constructor(options: HarvesterOptions = {}) {
    this.options = {
      baseUrl: 'http://localhost:3000',
      viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
      projectSlug: 'default-project',
      fps: 60,
      ...options,
    };
  }

  async runScenario(scenario: ScenarioFunction): Promise<InteractionTrace> {
    const harness = new ScenarioHarness(this.options.projectSlug, this.options.fps);
    // Mock or live browser context
    await scenario({
      page: {},
      capture: harness,
    });
    return harness.getTelemetry();
  }
}
