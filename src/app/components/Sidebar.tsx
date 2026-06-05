import { useState } from 'react';
import { Search, ChevronDown, LayoutGrid, X } from 'lucide-react';
import type { Expertise, Segment } from '../data/expertises';
import { segmentColors } from '../data/expertises';
import { SEGMENTS } from '../utils/careerPathUtils';
import { useAppPreferences } from '../context/AppPreferences';

interface SidebarProps {
  expertises: Expertise[];
  selectedExpertise: string | null;
  onSelectExpertise: (id: string) => void;
}

function ExpertiseListButton({
  exp,
  isSelected,
  dotColor,
  notEnabledLabel,
  onSelect,
}: {
  exp: Expertise;
  isSelected: boolean;
  dotColor: string;
  notEnabledLabel: string;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(exp.id)}
      className={[
        'w-full text-left rounded-xl transition-all duration-200 cursor-pointer',
        'border-l-[3px] flex items-center gap-2.5 px-3 py-2.5',
        isSelected
          ? 'bg-[var(--cp-primary)] border-[var(--cp-highlight)] text-white shadow-md'
          : 'border-transparent hover:bg-[var(--cp-primary)]/10 text-cp',
        !exp.enabled && !isSelected ? 'opacity-70' : '',
      ].join(' ')}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{
          backgroundColor: isSelected ? 'var(--cp-highlight)' : dotColor,
        }}
      />
      <span className="flex-1 min-w-0 truncate text-sm font-medium">{exp.name}</span>
      {!exp.enabled && (
        <span className="text-[9px] uppercase tracking-wide shrink-0 opacity-80">
          {notEnabledLabel}
        </span>
      )}
    </button>
  );
}

function ExpertisePanel({
  groupedBySegment,
  collapsedSegments,
  selectedExpertise,
  notEnabledLabel,
  onSelect,
  onToggleSegment,
}: {
  groupedBySegment: Record<Segment, Expertise[]>;
  collapsedSegments: Partial<Record<Segment, boolean>>;
  selectedExpertise: string | null;
  notEnabledLabel: string;
  onSelect: (id: string) => void;
  onToggleSegment: (segment: Segment) => void;
}) {
  return (
    <>
      {SEGMENTS.map((segment) => {
        const items = groupedBySegment[segment] || [];
        if (items.length === 0) return null;

        const isCollapsed = collapsedSegments[segment] ?? false;
        const dotColor = segmentColors[segment];

        return (
          <div key={segment}>
            <button
              type="button"
              onClick={() => onToggleSegment(segment)}
              className="w-full flex items-center justify-between px-2 py-1.5 mb-1"
            >
              <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-cp-muted">
                {segment}
                <span className="opacity-60 font-normal ml-1">({items.length})</span>
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-cp-muted transition-transform ${
                  isCollapsed ? '-rotate-90' : ''
                }`}
              />
            </button>

            {!isCollapsed && (
              <div className="space-y-0.5">
                {items.map((exp) => (
                  <ExpertiseListButton
                    key={exp.id}
                    exp={exp}
                    isSelected={selectedExpertise === exp.id}
                    dotColor={dotColor}
                    notEnabledLabel={notEnabledLabel}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export function Sidebar({ expertises, selectedExpertise, onSelectExpertise }: SidebarProps) {
  const { t } = useAppPreferences();
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSegments, setCollapsedSegments] = useState<Partial<Record<Segment, boolean>>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const matchesSearch = (exp: Expertise) =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

  const groupedBySegment = expertises.filter(matchesSearch).reduce(
    (acc, exp) => {
      if (!acc[exp.segment]) acc[exp.segment] = [];
      acc[exp.segment].push(exp);
      return acc;
    },
    {} as Record<Segment, Expertise[]>
  );

  const enabledCount = expertises.filter((e) => e.enabled).length;

  const toggleSegment = (segment: Segment) => {
    setCollapsedSegments((prev) => ({ ...prev, [segment]: !prev[segment] }));
  };

  const handleSelect = (id: string) => {
    onSelectExpertise(id);
    setMobileOpen(false);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const panelHeader = (
    <>
      <h2 className="font-display text-lg text-cp mb-0.5">{t.sidebarTitle}</h2>
      <p className="text-[11px] text-cp-muted">
        {t.sidebarCount(enabledCount, expertises.length)}
      </p>
    </>
  );

  const searchBox = (
    <div className="relative glass-search rounded-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cp-muted" />
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent text-cp text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none placeholder:text-[var(--cp-text-muted)]/70"
        aria-label={t.searchAria}
      />
    </div>
  );

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="sidebar-mobile-backdrop lg:hidden"
          aria-label={t.mobileCloseAria}
          onClick={closeMobile}
        />
      )}

      <aside
        className={[
          'sidebar-rail h-full min-h-0 shrink-0 bg-cp-bg border-r border-cp flex flex-col overflow-hidden',
          'transition-[width,box-shadow] duration-300 ease-out',
          'w-[72px] lg:w-[280px]',
          mobileOpen ? 'sidebar-rail--open max-lg:w-[280px]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Mobile: một icon menu phía trên */}
        <div className="lg:hidden shrink-0 p-3 flex justify-center border-b border-cp">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className={[
              'sidebar-grid-btn',
              mobileOpen ? 'sidebar-grid-btn--open' : '',
              selectedExpertise ? 'sidebar-grid-btn--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={mobileOpen ? t.mobileCloseAria : t.mobileMenuAria}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-[22px] h-[22px]" strokeWidth={2} aria-hidden />
            ) : (
              <LayoutGrid className="w-[22px] h-[22px]" strokeWidth={2} aria-hidden />
            )}
          </button>
        </div>

        {/* Desktop — luôn hiện */}
        <div className="hidden lg:flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="shrink-0 p-6 pb-3">{panelHeader}</div>
          <div className="shrink-0 px-4 mb-3">{searchBox}</div>
          <div className="sidebar-scroll flex-1 min-h-0 overflow-y-auto px-4 pb-6 space-y-3">
            <ExpertisePanel
              groupedBySegment={groupedBySegment}
              collapsedSegments={collapsedSegments}
              selectedExpertise={selectedExpertise}
              notEnabledLabel={t.notEnabled}
              onSelect={onSelectExpertise}
              onToggleSegment={toggleSegment}
            />
          </div>
        </div>

        {/* Mobile — list trồi ra khi mở */}
        <div
          className={[
            'lg:hidden flex flex-col flex-1 min-h-0 overflow-hidden',
            mobileOpen ? 'flex' : 'hidden',
          ].join(' ')}
        >
          <div className="shrink-0 px-4 pt-4 pb-2">{panelHeader}</div>
          <div className="shrink-0 px-4 mb-3">{searchBox}</div>
          <div className="sidebar-scroll flex-1 min-h-0 overflow-y-auto px-4 pb-6 space-y-3">
            {Object.values(groupedBySegment).every((items) => items.length === 0) ? (
              <p className="text-sm text-cp-muted px-2 py-4 text-center">{t.noSearchResults}</p>
            ) : (
              <ExpertisePanel
                groupedBySegment={groupedBySegment}
                collapsedSegments={collapsedSegments}
                selectedExpertise={selectedExpertise}
                notEnabledLabel={t.notEnabled}
                onSelect={handleSelect}
                onToggleSegment={toggleSegment}
              />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
