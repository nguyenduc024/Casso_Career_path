import { Fragment, useEffect, useState } from 'react';
import { Share2, Download, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { CareerPath } from '../data/careerPaths';
import { RoleCard } from './RoleCard';
import { PathConnectors } from './PathConnectors';
import { expertises } from '../data/expertises';
import { copyCurrentUrl, exportDiagramToPdf } from '../utils/careerPathUtils';
import { useAppPreferences } from '../context/AppPreferences';
import type { Track } from '../data/careerPaths';
import { DIAGRAM_CANVAS_ATTR, getLevelRows, getMaxRow, getRoleRow } from '../utils/careerPathLayout';
import { trackTheme } from '../utils/designTokens';
import {
  CAREER_TRACKS,
  getDiagramGridColumns,
  getDiagramGridRows,
  LEVEL_ROW_HEIGHT_PX,
} from '../utils/careerPathGrid';

interface CareerPathDiagramProps {
  careerPath: CareerPath;
}

const gridGap = '0 0.875rem';

export function CareerPathDiagram({ careerPath }: CareerPathDiagramProps) {
  const { t } = useAppPreferences();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  const expertise = expertises.find((e) => e.id === careerPath.expertiseId);

  useEffect(() => {
    setSelectedRoleId(null);
    setHoveredRoleId(null);
  }, [careerPath.expertiseId]);

  const rolesByTrack = careerPath.roles.reduce(
    (acc, role) => {
      if (!acc[role.track]) acc[role.track] = [];
      acc[role.track].push(role);
      return acc;
    },
    {} as Record<Track, typeof careerPath.roles>
  );

  Object.values(rolesByTrack).forEach((roles) => {
    roles.sort((a, b) => a.level - b.level);
  });

  const maxRow = getMaxRow(careerPath.roles);
  const levelRows = getLevelRows(maxRow);
  const gridColumns = getDiagramGridColumns();
  const gridRows = getDiagramGridRows(maxRow);

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('expertise', careerPath.expertiseId);
    history.replaceState(null, '', url.toString());

    const copied = await copyCurrentUrl();
    if (copied) {
      setShareCopied(true);
      toast.success(t.shareCopied);
      setTimeout(() => setShareCopied(false), 2000);
    } else {
      toast.error(t.shareError);
    }
  };

  const handleExport = () => {
    exportDiagramToPdf(expertise?.name ?? 'Career Path');
    toast.info(t.exportHint);
  };

  const breadcrumbGroup = expertise?.group ?? 'Career Path';

  return (
    <div className="career-diagram-area">
      <div className="career-diagram-print-sheet p-8 lg:p-10 max-w-[1680px] mx-auto print:p-6">
        <header className="mb-8 animate-[card-enter_0.4s_ease-out_both]">
          <p className="text-[13px] text-cp-muted mb-2 font-medium tracking-wide">
            {breadcrumbGroup}
            <span className="mx-2 opacity-40">›</span>
            <span className="text-cp-primary">{expertise?.name}</span>
          </p>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-display text-[2rem] lg:text-[2.25rem] text-cp leading-tight mb-4">
                {expertise?.name}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                {expertise?.segment && (
                  <span className="px-3 py-1 rounded-full text-[12px] font-semibold border border-cp text-cp-primary bg-cp-surface/80">
                    {expertise.segment}
                  </span>
                )}
                {expertise?.flag && (
                  <span className="px-3 py-1 rounded-full text-[12px] font-medium border border-cp text-cp-muted bg-cp-surface/60">
                    {expertise.flag}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-[12px] font-medium text-cp-muted border border-cp">
                  {expertise?.group}
                </span>
                {expertise && !expertise.enabled && (
                  <span className="px-3 py-1 rounded-full text-[12px] text-cp-muted border border-dashed border-cp">
                    {t.notEnabled}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={handleExport}
                className="px-4 py-2 rounded-full bg-transparent border border-[var(--cp-primary)] text-cp-primary text-[13px] font-semibold hover:bg-[var(--cp-primary)]/10 transition-colors duration-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t.exportPdf}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="w-10 h-10 rounded-full border border-cp bg-cp-surface/80 flex items-center justify-center text-cp-primary hover:border-[var(--cp-primary)]/50 transition-colors duration-200"
                title={t.share}
              >
                {shareCopied ? (
                  <Check className="w-4 h-4 text-[var(--cp-highlight)]" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 h-px bg-[var(--cp-border)]" />
        </header>

        <div className="career-canvas-scroll-wrap">
          <div className="career-canvas-scroll min-w-0">
            <div className="min-w-[960px] relative">
              <div
                className="grid mb-4"
                style={{ gridTemplateColumns: gridColumns, gap: gridGap }}
              >
                {CAREER_TRACKS.map((track, trackIndex) => {
                  const theme = trackTheme[track];
                  const label = t.tracks[track as Track];
                  return (
                    <div
                      key={track}
                      className="px-2 pb-3 border-b border-cp role-card-enter"
                      style={{
                        animationDelay: `${trackIndex * 80}ms`,
                        backgroundColor: theme.tint,
                      }}
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-cp-muted text-center">
                        {label}
                      </span>
                      <span
                        className="block w-2 h-2 rounded-full mx-auto mt-2"
                        style={{ backgroundColor: theme.dot }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="relative" {...{ [DIAGRAM_CANVAS_ATTR]: '' }}>
                <div
                  className="absolute inset-0 grid pointer-events-none transition-[background] duration-300"
                  style={{
                    gridTemplateColumns: gridColumns,
                    gridTemplateRows: gridRows,
                    gap: gridGap,
                  }}
                >
                  {CAREER_TRACKS.map((track, trackIndex) => {
                    const theme = trackTheme[track];
                    const bright = hoveredTrack === track;
                    return (
                      <div
                        key={`bg-${track}`}
                        className="rounded-sm border border-cp transition-colors duration-300"
                        style={{
                          gridColumn: trackIndex + 1,
                          gridRow: `1 / ${maxRow + 1}`,
                          backgroundColor: bright
                            ? 'rgba(76, 195, 138, 0.06)'
                            : theme.tint,
                        }}
                      />
                    );
                  })}
                </div>

                <div
                  className="relative z-10 grid"
                  style={{
                    gridTemplateColumns: gridColumns,
                    gridTemplateRows: gridRows,
                    gap: gridGap,
                  }}
                >
                  {levelRows.map((level) => (
                    <Fragment key={level}>
                      {CAREER_TRACKS.map((track, trackIndex) => {
                        const roles = rolesByTrack[track] ?? [];
                        const theme = trackTheme[track];
                        const role = roles.find((r) => getRoleRow(r) === level);

                        if (!role) return null;

                        return (
                          <div
                            key={`${track}-${level}`}
                            className="relative z-10 flex items-center justify-center px-2"
                            style={{
                              gridRow: level,
                              gridColumn: trackIndex + 1,
                              height: LEVEL_ROW_HEIGHT_PX,
                              maxHeight: LEVEL_ROW_HEIGHT_PX,
                            }}
                            onMouseEnter={() => setHoveredTrack(track)}
                            onMouseLeave={() => setHoveredTrack(null)}
                          >
                            <RoleCard
                              role={role}
                              trackColor={theme.dot}
                              trackIndex={trackIndex}
                              rowIndex={level}
                              isSelected={selectedRoleId === role.id}
                              isHovered={hoveredRoleId === role.id}
                              onSelect={setSelectedRoleId}
                              onHover={setHoveredRoleId}
                            />
                          </div>
                        );
                      })}
                    </Fragment>
                  ))}
                </div>

                <PathConnectors
                  roles={careerPath.roles}
                  connections={careerPath.connections}
                  hoveredRoleId={hoveredRoleId}
                  selectedRoleId={selectedRoleId}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 glass-panel rounded-2xl px-6 py-4 print:hidden">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-cp-surface/90 border border-cp text-[13px] text-cp">
              <span className="inline-block w-8 h-0 border-t-[1.5px] border-[var(--cp-secondary)]" aria-hidden />
              {t.legendPromotion}
            </span>
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-cp-surface/90 border border-cp text-[13px] text-cp">
              <span
                className="inline-block w-8 h-0 border-t-[1.5px] border-dashed border-[var(--cp-highlight)]"
                aria-hidden
              />
              {t.legendBidirectional}
            </span>
            <span className="hidden sm:block w-px h-5 bg-[var(--cp-border)]" />
            {CAREER_TRACKS.map((track) => (
              <span
                key={track}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cp-surface/70 text-[13px] text-cp"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: trackTheme[track].dot }}
                  aria-hidden
                />
                {t.tracks[track as Track]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
