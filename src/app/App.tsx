import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Sidebar } from './components/Sidebar';
import { CareerPathDiagram } from './components/CareerPathDiagram';
import { EmptyState } from './components/EmptyState';
import { MissingPathState } from './components/MissingPathState';
import { HeaderToolbar } from './components/HeaderToolbar';
import { useAppPreferences } from './context/AppPreferences';
import { expertises } from './data/expertises';
import { careerPaths } from './data/careerPaths';
import { cassoLogoUrl } from './cassoLogo';

function getInitialExpertiseId(): string | null {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('expertise');
  if (fromUrl && expertises.some((e) => e.id === fromUrl)) {
    return fromUrl;
  }
  return null;
}

export default function App() {
  const { t } = useAppPreferences();
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(getInitialExpertiseId);

  const selectedExpertiseData = selectedExpertise
    ? expertises.find((e) => e.id === selectedExpertise)
    : null;

  const selectedPath = selectedExpertise
    ? careerPaths.find((path) => path.expertiseId === selectedExpertise)
    : null;

  const enabledCount = expertises.filter((e) => e.enabled).length;

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedExpertise) {
      url.searchParams.set('expertise', selectedExpertise);
    } else {
      url.searchParams.delete('expertise');
    }
    history.replaceState(null, '', url.toString());
  }, [selectedExpertise]);

  return (
    <div className="size-full flex flex-col bg-cp-bg">
      <Toaster position="top-right" />

      <header className="h-14 shrink-0 border-b border-cp bg-[var(--cp-header)] backdrop-blur-md flex items-center justify-between gap-4 px-6 lg:px-8 print:hidden">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={cassoLogoUrl}
            alt="Casso"
            className="h-8 w-auto max-w-[120px] object-contain shrink-0"
          />
          <span className="font-brand text-[1.35rem] text-cp-primary shrink-0">Casso</span>
          <span className="hidden sm:inline text-cp-muted text-sm font-medium truncate">
            {t.careerPath}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[12px] text-cp-muted hidden lg:block tracking-wide max-w-[220px] truncate">
            {t.headerTagline}
          </span>
          <HeaderToolbar />
        </div>
      </header>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div className="print:hidden h-full min-h-0 shrink-0 flex">
          <Sidebar
            expertises={expertises}
            selectedExpertise={selectedExpertise}
            onSelectExpertise={setSelectedExpertise}
          />
        </div>

        <main className="flex-1 overflow-auto min-w-0">
          {!selectedExpertise ? (
            <EmptyState
              enabledCount={enabledCount}
              totalCount={expertises.length}
              onExplore={(id) => setSelectedExpertise(id)}
            />
          ) : selectedPath ? (
            <CareerPathDiagram careerPath={selectedPath} />
          ) : (
            <MissingPathState expertiseName={selectedExpertiseData?.name ?? ''} />
          )}
        </main>
      </div>
    </div>
  );
}
