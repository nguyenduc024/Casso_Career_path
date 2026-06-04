import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import type { Expertise, Segment } from '../data/expertises';
import { segmentColors } from '../data/expertises';

interface SidebarProps {
  expertises: Expertise[];
  selectedExpertise: string | null;
  onSelectExpertise: (id: string) => void;
}

const segmentEmojis: Record<Segment, string> = {
  BUILD: '🛠',
  SALE: '💼',
  SERVICE: '🤝',
  MANAGE: '📊',
  PROFIT: '💰',
};

export function Sidebar({ expertises, selectedExpertise, onSelectExpertise }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExpertises = expertises.filter((exp) =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedBySegment = filteredExpertises.reduce((acc, exp) => {
    if (!acc[exp.segment]) {
      acc[exp.segment] = [];
    }
    acc[exp.segment].push(exp);
    return acc;
  }, {} as Record<Segment, Expertise[]>);

  const enabledCount = expertises.filter((e) => e.enabled).length;

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[320px] backdrop-blur-xl bg-gradient-to-b from-[#1B4332]/95 to-[#0D0D0D]/95 flex flex-col border-r border-[#40916C]/20"
    >
      {/* Header */}
      <div className="p-8">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-white font-bold text-xl mb-2">Expertises</h2>
          <p className="text-[#52B788] text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-[#52B788] rounded-full animate-pulse" />
            {enabledCount} active paths
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52B788]/60" />
          <input
            type="text"
            placeholder="Search expertises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 text-white text-sm rounded-xl pl-11 pr-4 py-3 border border-white/10 focus:border-[#40916C] focus:bg-white/10 focus:outline-none placeholder:text-white/30 transition-all"
          />
        </motion.div>
      </div>

      {/* Expertise List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
        {(['BUILD', 'SALE', 'SERVICE', 'MANAGE', 'PROFIT'] as Segment[]).map((segment, segmentIndex) => {
          const items = groupedBySegment[segment] || [];
          if (items.length === 0) return null;

          return (
            <motion.div
              key={segment}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + segmentIndex * 0.1 }}
              className="space-y-2"
            >
              {/* Segment Header */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-lg">{segmentEmojis[segment]}</span>
                <span
                  className="text-xs tracking-wider uppercase font-bold"
                  style={{ color: segmentColors[segment] }}
                >
                  {segment}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-1">
                {items.map((exp, index) => {
                  const isSelected = selectedExpertise === exp.id;
                  const isDisabled = !exp.enabled;

                  return (
                    <motion.button
                      key={exp.id}
                      disabled={isDisabled}
                      onClick={() => !isDisabled && onSelectExpertise(exp.id)}
                      whileHover={!isDisabled ? { x: 4, scale: 1.02 } : {}}
                      whileTap={!isDisabled ? { scale: 0.98 } : {}}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className={`
                        w-full px-4 py-3 rounded-xl text-left transition-all duration-300
                        ${isSelected
                          ? 'bg-gradient-to-r from-[#40916C] to-[#2D6A4F] shadow-lg shadow-[#40916C]/20'
                          : 'bg-white/5 hover:bg-white/10'
                        }
                        ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: isSelected ? '#fff' : segmentColors[segment],
                            boxShadow: isSelected ? '0 0 8px rgba(255,255,255,0.5)' : 'none'
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">
                            {exp.name}
                          </div>
                          {!isDisabled && (
                            <div className="text-[10px] text-white/60 mt-0.5">
                              {exp.group}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white text-xs"
                          >
                            ✓
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.aside>
  );
}
