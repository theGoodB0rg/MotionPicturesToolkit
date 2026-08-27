export interface TraceLogEntry {
  timestamp: string;
  phase: 'capture' | 'audio-synthesis' | 'choreography' | 'composition' | 'render';
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: Record<string, unknown>;
  durationMs?: number;
}

export class TraceLogger {
  private entries: TraceLogEntry[] = [];
  private phaseStartTimes: Map<string, number> = new Map();

  startPhase(phase: TraceLogEntry['phase'], message?: string): void {
    this.phaseStartTimes.set(phase, Date.now());
    this.log({
      phase,
      level: 'info',
      message: message || `Starting phase: ${phase}`,
    });
  }

  endPhase(phase: TraceLogEntry['phase'], message?: string, data?: Record<string, unknown>): void {
    const startTime = this.phaseStartTimes.get(phase);
    const durationMs = startTime ? Date.now() - startTime : undefined;
    this.phaseStartTimes.delete(phase);

    this.log({
      phase,
      level: 'info',
      message: message || `Completed phase: ${phase}`,
      durationMs,
      data,
    });
  }

  log(entry: Omit<TraceLogEntry, 'timestamp'>): void {
    const fullEntry: TraceLogEntry = {
      timestamp: new Date().toISOString(),
      ...entry,
    };
    this.entries.push(fullEntry);
  }

  exportTraceJson(): string {
    return JSON.stringify(
      {
        toolkit: 'MotionPicturesToolkit',
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        totalLogs: this.entries.length,
        traces: this.entries,
      },
      null,
      2
    );
  }

  getEntries(): TraceLogEntry[] {
    return [...this.entries];
  }
}

export const defaultLogger = new TraceLogger();
