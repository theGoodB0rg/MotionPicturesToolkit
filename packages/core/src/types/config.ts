export interface ProjectMetadata {
  name: string;
  slug: string;
  version?: string;
  description?: string;
}

export interface VideoConfig {
  width: number;
  height: number;
  fps: number;
  durationInSeconds: number;
}

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor?: string;
  accentColor: string;
  fontFamily: string;
  headingFontFamily?: string;
  logo?: string;
  theme?: 'dark' | 'light' | 'midnight' | 'cyberpunk' | 'minimal';
}

export interface CaptureConfig {
  target: 'web' | 'mobile-ios' | 'mobile-android';
  baseUrl?: string;
  viewport?: {
    width: number;
    height: number;
    deviceScaleFactor?: number;
  };
  scenario?: string;
}

export interface AudioConfig {
  voiceover?: {
    provider: 'edge-tts' | 'elevenlabs' | 'openai';
    voice?: string;
    voiceId?: string;
    rate?: string;
    pitch?: string;
    apiKeyEnv?: string;
  };
  backgroundMusic?: string;
  musicDuckingDb?: number;
  enableSfx?: boolean;
}

export interface MockupConfig {
  defaultDevice:
    | 'macbook-pro-16'
    | 'iphone-16-pro'
    | 'ipad-pro'
    | 'safari-browser'
    | 'clay-phone'
    | 'none';
  material?: 'photorealistic' | 'clay' | 'glass';
  shadows?: boolean;
  background?: 'mesh-gradient' | 'particles' | 'solid' | 'grid';
}

export interface MotionConfig {
  project: ProjectMetadata;
  video: VideoConfig;
  branding: BrandingConfig;
  capture?: CaptureConfig;
  audio?: AudioConfig;
  mockup?: MockupConfig;
}

/**
 * Type-safe configuration helper for MotionPicturesToolkit projects
 */
export function defineConfig(config: MotionConfig): MotionConfig {
  return config;
}
