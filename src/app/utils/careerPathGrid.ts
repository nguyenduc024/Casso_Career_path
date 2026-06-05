import type { Track } from './careerPaths';

export const CAREER_TRACKS: Track[] = [
  'trainee',
  'intern',
  'professional',
  'management',
  'leadership',
];

export const TRACK_COLUMN_WIDTH: Record<Track, string> = {
  trainee: 'minmax(148px, 1fr)',
  intern: 'minmax(148px, 1fr)',
  professional: 'minmax(196px, 1.15fr)',
  management: 'minmax(196px, 1.15fr)',
  leadership: 'minmax(196px, 1.15fr)',
};

export const LEVEL_ROW_HEIGHT_PX = 96;

export function getDiagramGridColumns(): string {
  return CAREER_TRACKS.map((t) => TRACK_COLUMN_WIDTH[t]).join(' ');
}

export function getDiagramGridRows(maxRow: number): string {
  return `repeat(${maxRow}, ${LEVEL_ROW_HEIGHT_PX}px)`;
}
