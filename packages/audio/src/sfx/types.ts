export type SoundEffectName =
  | 'whoosh-fast'
  | 'whoosh-cinematic'
  | 'keyboard-tap'
  | 'mouse-click'
  | 'pop-modern'
  | 'success-chime'
  | 'sub-bass-drop';

export interface SoundEffectInstance {
  name: SoundEffectName;
  atFrame: number;
  volume?: number;
}
