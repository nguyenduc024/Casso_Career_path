import { expertises } from '../data/expertises';

const EMPTY_CTA_EXPERTISE_ID = 'software';
import { useAppPreferences } from '../context/AppPreferences';
import { cassoLogoUrl } from '../cassoLogo';

interface EmptyStateProps {
  enabledCount: number;
  totalCount: number;
  onExplore: (id: string) => void;
}

export function EmptyState({ enabledCount, totalCount, onExplore }: EmptyStateProps) {
  const { t } = useAppPreferences();
  const softwareExpertise = expertises.find(
    (e) => e.id === EMPTY_CTA_EXPERTISE_ID && e.enabled
  );
  const h = t.emptyHeadline;

  return (
    <div className="h-full flex items-center justify-center p-8 sm:p-12 career-diagram-area">
      <div className="text-center max-w-xl role-card-enter">
        <div className="mb-8 sm:mb-10 flex justify-center">
          <img
            src={cassoLogoUrl}
            alt="Casso"
            className="empty-state-logo w-auto object-contain drop-shadow-sm"
          />
        </div>

        <h2 className="empty-headline font-rounded mb-4 px-2">
          <span>{h.lead}</span>
          <span className="empty-marker">{h.ceo}</span>
          <span>{h.mid}</span>
          <span className="empty-marker">{h.casso}</span>
          <span>{h.tail}</span>
        </h2>

        <p className="text-cp-muted text-base mb-8">{t.emptySubtitle(enabledCount, totalCount)}</p>

        <button
          type="button"
          onClick={() => softwareExpertise && onExplore(softwareExpertise.id)}
          disabled={!softwareExpertise}
          className="empty-ready-btn font-rounded"
        >
          {t.emptyReady}
        </button>
      </div>
    </div>
  );
}
