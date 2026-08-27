export interface CursorPoint {
  timestampMs: number;
  frame: number;
  x: number;
  y: number;
  type: 'move' | 'click-down' | 'click-up' | 'scroll';
}

export interface ElementBound {
  selector: string;
  label?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
  zoomSuggestion?: number;
}

export interface CaptureCheckpoint {
  label: string;
  frame: number;
  timestampMs: number;
}

export interface InteractionTrace {
  projectSlug: string;
  capturedAt: string;
  viewport: { width: number; height: number; deviceScaleFactor: number };
  fps: number;
  totalDurationMs: number;
  cursorTrail: CursorPoint[];
  elementBounds: ElementBound[];
  checkpoints: CaptureCheckpoint[];
}
