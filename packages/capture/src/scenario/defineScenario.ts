import { InteractionTrace, CursorPoint, ElementBound, CaptureCheckpoint } from '../types/telemetry.js';

export interface SmoothClickOptions {
  label?: string;
  zoomFactor?: number;
  steps?: number;
  triggerSfx?: 'mouse-click' | 'pop-modern';
}

export interface SmoothTypeOptions {
  wpm?: number;
  triggerSfx?: 'keyboard-tap';
}

export interface HighlightOptions {
  badgeText?: string;
  durationFrames?: number;
}

export interface CaptureContext {
  checkpoint(label: string): Promise<void>;
  smoothClick(locator: unknown, options?: SmoothClickOptions): Promise<void>;
  smoothType(locator: unknown, text: string, options?: SmoothTypeOptions): Promise<void>;
  highlight(locator: unknown, options?: HighlightOptions): Promise<void>;
  wait(ms: number): Promise<void>;
  getTelemetry(): InteractionTrace;
}

export interface ScenarioDefinitionOptions {
  page: unknown;
  capture: CaptureContext;
}

export type ScenarioFunction = (context: ScenarioDefinitionOptions) => Promise<void>;

export class ScenarioHarness implements CaptureContext {
  private startTime: number = Date.now();
  private cursorTrail: CursorPoint[] = [];
  private elementBounds: ElementBound[] = [];
  private checkpoints: CaptureCheckpoint[] = [];
  private fps: number = 60;
  private projectSlug: string;

  constructor(projectSlug: string = 'default-project', fps: number = 60) {
    this.projectSlug = projectSlug;
    this.fps = fps;
  }

  private getCurrentFrame(): number {
    const elapsedMs = Date.now() - this.startTime;
    return Math.round((elapsedMs / 1000) * this.fps);
  }

  async checkpoint(label: string): Promise<void> {
    const frame = this.getCurrentFrame();
    this.checkpoints.push({
      label,
      frame,
      timestampMs: Date.now() - this.startTime,
    });
  }

  async smoothClick(locator: unknown, options: SmoothClickOptions = {}): Promise<void> {
    const frame = this.getCurrentFrame();
    this.cursorTrail.push({
      timestampMs: Date.now() - this.startTime,
      frame,
      x: 500,
      y: 300,
      type: 'click-down',
    });

    if (options.label) {
      this.elementBounds.push({
        selector: 'target',
        label: options.label,
        x: 500,
        y: 300,
        width: 120,
        height: 40,
        frame,
        zoomSuggestion: options.zoomFactor ?? 1.3,
      });
    }

    // Call native click if locator is a Playwright Locator object
    if (locator && typeof (locator as { click?: () => Promise<void> }).click === 'function') {
      await (locator as { click: () => Promise<void> }).click();
    }
  }

  async smoothType(locator: unknown, text: string, _options: SmoothTypeOptions = {}): Promise<void> {
    if (locator && typeof (locator as { fill?: (text: string) => Promise<void> }).fill === 'function') {
      await (locator as { fill: (text: string) => Promise<void> }).fill(text);
    }
  }

  async highlight(locator: unknown, options: HighlightOptions = {}): Promise<void> {
    const frame = this.getCurrentFrame();
    this.elementBounds.push({
      selector: 'highlight',
      label: options.badgeText,
      x: 600,
      y: 400,
      width: 300,
      height: 200,
      frame,
    });
  }

  async wait(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  getTelemetry(): InteractionTrace {
    return {
      projectSlug: this.projectSlug,
      capturedAt: new Date().toISOString(),
      viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
      fps: this.fps,
      totalDurationMs: Date.now() - this.startTime,
      cursorTrail: this.cursorTrail,
      elementBounds: this.elementBounds,
      checkpoints: this.checkpoints,
    };
  }
}

/**
 * Define a deterministic UI capture scenario
 */
export function defineScenario(scenarioFn: ScenarioFunction): ScenarioFunction {
  return scenarioFn;
}
