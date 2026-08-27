export type TransitionType =
  | 'fade'
  | 'fade-through-black'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'wipe-left'
  | 'none';

export type DeviceModelType =
  | 'macbook-pro-16'
  | 'iphone-16-pro'
  | 'ipad-pro'
  | 'safari-browser'
  | 'clay-phone'
  | 'none';

export interface CameraKeyframe {
  atFrame: number;
  zoom: number;
  target: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | { x: number; y: number };
  duration?: number;
  easing?: 'snappy' | 'smooth' | 'gentle' | 'bouncy';
}

export interface CameraTrajectory {
  initialZoom?: number;
  initialTarget?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | { x: number; y: number };
  moves?: CameraKeyframe[];
  springPhysics?: {
    damping?: number;
    mass?: number;
    stiffness?: number;
  };
}

export interface CalloutBadge {
  atFrame: number;
  text: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | { x: number; y: number };
  icon?: string;
  durationFrames?: number;
  highlightGlow?: boolean;
}

export interface SoundEffectTrigger {
  atFrame: number;
  effect:
    | 'whoosh-fast'
    | 'whoosh-cinematic'
    | 'keyboard-tap'
    | 'mouse-click'
    | 'pop-modern'
    | 'success-chime'
    | 'sub-bass-drop';
  volume?: number;
}

export interface BentoItem {
  title: string;
  description?: string;
  stat?: string;
  statLabel?: string;
  icon?: string;
  accentColor?: string;
  badge?: string;
}

export type SceneType = 'hook' | 'app-demo' | 'bento' | 'social-proof' | 'cta' | 'custom';

export interface BaseSceneConfig {
  id?: string;
  durationSeconds: number;
  voiceover?: string;
  transition?: TransitionType;
  sfx?: SoundEffectTrigger[];
}

export interface HookSceneConfig extends BaseSceneConfig {
  type: 'hook';
  title: string;
  subtitle?: string;
  badgeText?: string;
  accentEffect?: 'glow' | 'lens-flare' | 'matrix-grid' | 'none';
}

export interface AppDemoSceneConfig extends BaseSceneConfig {
  type: 'app-demo';
  source?: string;
  headline?: string;
  device?: DeviceModelType;
  camera?: CameraTrajectory;
  callouts?: CalloutBadge[];
  mockupMaterial?: 'photorealistic' | 'clay' | 'glass';
}

export interface BentoSceneConfig extends BaseSceneConfig {
  type: 'bento';
  headline: string;
  subheadline?: string;
  items: BentoItem[];
}

export interface SocialProofSceneConfig extends BaseSceneConfig {
  type: 'social-proof';
  headline: string;
  stats: Array<{ value: string; label: string; subtext?: string }>;
  quote?: { text: string; author: string; role: string; avatar?: string };
}

export interface CTASceneConfig extends BaseSceneConfig {
  type: 'cta';
  title: string;
  subtitle?: string;
  ctaButtonText: string;
  installCommand?: string;
  brandUrl?: string;
  logo?: string;
}

export interface CustomSceneConfig extends BaseSceneConfig {
  type: 'custom';
  name: string;
  props?: Record<string, unknown>;
}

export type SceneDefinition =
  | HookSceneConfig
  | AppDemoSceneConfig
  | BentoSceneConfig
  | SocialProofSceneConfig
  | CTASceneConfig
  | CustomSceneConfig;

export interface Storyboard {
  title?: string;
  scenes: SceneDefinition[];
}

/**
 * High-level scene builder helpers
 */
export const Scene = {
  Hook: (config: Omit<HookSceneConfig, 'type'>): HookSceneConfig => ({
    type: 'hook',
    ...config,
  }),
  AppDemo: (config: Omit<AppDemoSceneConfig, 'type'>): AppDemoSceneConfig => ({
    type: 'app-demo',
    ...config,
  }),
  FeatureBento: (config: Omit<BentoSceneConfig, 'type'>): BentoSceneConfig => ({
    type: 'bento',
    ...config,
  }),
  SocialProof: (config: Omit<SocialProofSceneConfig, 'type'>): SocialProofSceneConfig => ({
    type: 'social-proof',
    ...config,
  }),
  CallToAction: (config: Omit<CTASceneConfig, 'type'>): CTASceneConfig => ({
    type: 'cta',
    ...config,
  }),
  Custom: (config: Omit<CustomSceneConfig, 'type'>): CustomSceneConfig => ({
    type: 'custom',
    ...config,
  }),
};

/**
 * Storyboard definition helper
 */
export function defineStoryboard(scenes: SceneDefinition[]): Storyboard {
  return { scenes };
}
