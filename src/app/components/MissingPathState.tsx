import { MapPinOff } from 'lucide-react';
import { useAppPreferences } from '../context/AppPreferences';

interface MissingPathStateProps {
  expertiseName: string;
}

export function MissingPathState({ expertiseName }: MissingPathStateProps) {
  const { t } = useAppPreferences();

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] flex items-center justify-center p-12 career-diagram-area">
      <div className="text-center max-w-md role-card-enter">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[var(--cp-primary)]/10 flex items-center justify-center border border-cp">
          <MapPinOff className="w-8 h-8 text-cp-primary" />
        </div>
        <h2 className="font-display text-2xl text-cp mb-3">{t.missingTitle}</h2>
        <p className="text-cp-muted">{t.missingBody(expertiseName)}</p>
      </div>
    </div>
  );
}
