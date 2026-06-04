import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { CareerPathDiagram } from './components/CareerPathDiagram';
import { EmptyState } from './components/EmptyState';
import { expertises } from './data/expertises';
import { careerPaths } from './data/careerPaths';

export default function App() {
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);

  const selectedPath = selectedExpertise
    ? careerPaths.find((path) => path.expertiseId === selectedExpertise)
    : null;

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-[#F5F5F0] via-[#FAFAF8] to-[#F0FFF4]">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-20 backdrop-blur-xl bg-[#0D0D0D]/95 border-b border-[#40916C]/20 flex items-center justify-between px-10 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-2xl tracking-tight"
          >
            CASSO
          </motion.div>
          <div className="h-6 w-px bg-[#40916C]/30" />
          <div className="text-white/70 text-sm">Career Explorer</div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#52B788] text-sm font-medium"
        >
          ✨ Explore your path
        </motion.div>
      </motion.header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          expertises={expertises}
          selectedExpertise={selectedExpertise}
          onSelectExpertise={setSelectedExpertise}
        />

        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {selectedPath ? (
              <motion.div
                key="diagram"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <CareerPathDiagram careerPath={selectedPath} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <EmptyState onExplore={() => setSelectedExpertise(expertises[0].id)} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
