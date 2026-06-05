import type { Role } from '../data/careerPaths';

/** Trainee / Intern ngầm coi là L1 để căn hàng với Professional L1, v.v. */
export function getRoleRow(role: Role): number {
  if (role.track === 'trainee' || role.track === 'intern') {
    return 1;
  }
  return role.level;
}

export function getMaxRow(roles: Role[]): number {
  if (roles.length === 0) return 1;
  return Math.max(1, ...roles.map(getRoleRow));
}

/** Các hàng L1 … Lmax (không có hàng 0). */
export function getLevelRows(maxRow: number): number[] {
  return Array.from({ length: maxRow }, (_, i) => i + 1);
}

/** Nhãn L trên thẻ — Trainee/Intern không hiện số L trên card. */
export function getLevelLabel(role: Role): string | null {
  if (role.level <= 0) {
    return null;
  }
  return `L${role.level}`;
}

export const DIAGRAM_CANVAS_ATTR = 'data-diagram-canvas';
