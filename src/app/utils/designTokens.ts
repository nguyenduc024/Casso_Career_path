import type { Track } from '../data/careerPaths';
import type { Segment } from '../data/expertises';

export const CP = {
  bg: '#FAFAF7',
  primary: '#1A6B4A',
  secondary: '#2D9B6F',
  highlight: '#4CC38A',
  text: '#0F1A14',
  textMuted: '#6B7A72',
  surface: '#FFFFFF',
} as const;

/** Green-only segment dots (no multi-hue) */
export const segmentColors: Record<Segment, string> = {
  BUILD: '#1A6B4A',
  SALE: '#2D9B6F',
  SERVICE: '#4CC38A',
  MANAGE: '#3D7A5C',
  PROFIT: '#145A3E',
};

export const trackTheme: Record<
  Track,
  { dot: string; tint: string; label: string }
> = {
  trainee: { dot: '#B7E4C7', tint: 'rgba(183,228,199,0.04)', label: 'Trainee' },
  intern: { dot: '#95D5B2', tint: 'rgba(149,213,178,0.04)', label: 'Intern' },
  professional: { dot: '#2D9B6F', tint: 'rgba(45,155,111,0.04)', label: 'Professional' },
  management: { dot: '#1A6B4A', tint: 'rgba(26,107,74,0.04)', label: 'Management' },
  leadership: { dot: '#145A3E', tint: 'rgba(20,90,62,0.04)', label: 'Leadership' },
};
