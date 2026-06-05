import type { Track } from './careerPaths';
import { DIAGRAM_CANVAS_ATTR } from './careerPathLayout';

/** Nhãn cột diagram — tiếng Anh gốc */
export const trackHeaderLabels: Record<Track, string> = {
  trainee: 'Trainee',
  intern: 'Intern',
  professional: 'Professional',
  management: 'Management',
  leadership: 'Leadership',
};

export const SEGMENTS = ['BUILD', 'SALE', 'SERVICE', 'MANAGE', 'PROFIT'] as const;

const PRINT_MAX_WIDTH_PX = 1050;
const PRINT_MAX_HEIGHT_PX = 720;

export function getFirstEnabledExpertiseId(
  items: { id: string; enabled: boolean }[]
): string | null {
  return items.find((item) => item.enabled)?.id ?? null;
}

export function getDefaultExpertiseId(
  items: { id: string; enabled: boolean }[]
): string | null {
  const warehouse = items.find((item) => item.id === 'warehouse' && item.enabled);
  return warehouse?.id ?? getFirstEnabledExpertiseId(items);
}

export async function copyCurrentUrl(): Promise<boolean> {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

function recalcConnectors(): void {
  window.dispatchEvent(new CustomEvent('casso:recalc-connectors'));
}

function applyPrintZoom(): void {
  const sheet = document.querySelector('.career-diagram-print-sheet') as HTMLElement | null;
  if (!sheet) return;

  const w = sheet.offsetWidth || sheet.scrollWidth;
  const h = sheet.offsetHeight || sheet.scrollHeight;
  if (w < 1 || h < 1) return;

  const zoom = Math.min(1, PRINT_MAX_WIDTH_PX / w, PRINT_MAX_HEIGHT_PX / h);
  document.documentElement.style.setProperty('--print-zoom', String(zoom));
}

function clearPrintState(): void {
  document.documentElement.classList.remove('is-exporting-pdf');
  document.documentElement.style.removeProperty('--print-zoom');
}

function waitForLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
        setTimeout(resolve, 80);
      });
    });
  });
}

export function exportDiagramToPdf(expertiseName: string): void {
  const root = document.documentElement;
  const previousTitle = document.title;

  root.classList.add('is-exporting-pdf');
  document.title = `Casso Career Path - ${expertiseName}`;

  document.querySelector(`[${DIAGRAM_CANVAS_ATTR}]`)?.closest('.career-diagram-area')?.scrollIntoView({
    block: 'start',
  });

  const onBeforePrint = () => {
    applyPrintZoom();
    recalcConnectors();
    requestAnimationFrame(() => recalcConnectors());
  };

  const cleanup = () => {
    clearPrintState();
    document.title = previousTitle;
    recalcConnectors();
    window.removeEventListener('afterprint', cleanup);
    window.removeEventListener('beforeprint', onBeforePrint);
  };

  window.addEventListener('beforeprint', onBeforePrint);
  window.addEventListener('afterprint', cleanup);

  void (async () => {
    await waitForLayout();
    recalcConnectors();
    await waitForLayout();
    window.print();
  })();
}
