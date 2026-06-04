import { motion } from 'motion/react';
import { Share2, Download } from 'lucide-react';
import type { CareerPath, Track } from '../data/careerPaths';
import { RoleCard } from './RoleCard';
import { PathConnectors } from './PathConnectors';
import { expertises } from '../data/expertises';
import { segmentColors } from '../data/expertises';

interface CareerPathDiagramProps {
  careerPath: CareerPath;
}

const trackConfig: Record<Track, { label: string; bg: string; color: string }> = {
  trainee: {
    label: 'Trainee',
    bg: 'rgba(255, 255, 255, 0.4)',
    color: '#A8D5B5',
  },
  intern: {
    label: 'Intern',
    bg: 'rgba(255, 255, 255, 0.5)',
    color: '#74C69D',
  },
  professional: {
    label: 'Professional',
    bg: 'rgba(240, 255, 244, 0.6)',
    color: '#40916C',
  },
  management: {
    label: 'Management',
    bg: 'rgba(245, 245, 240, 0.6)',
    color: '#2D6A4F',
  },
  leadership: {
    label: 'Leadership',
    bg: 'rgba(232, 245, 233, 0.7)',
    color: '#1B4332',
  },
};

export function CareerPathDiagram({ careerPath }: CareerPathDiagramProps) {
  const expertise = expertises.find((e) => e.id === careerPath.expertiseId);

  // Group roles by track
  const rolesByTrack = careerPath.roles.reduce((acc, role) => {
    if (!acc[role.track]) {
      acc[role.track] = [];
    }
    acc[role.track].push(role);
    return acc;
  }, {} as Record<Track, typeof careerPath.roles>);

  // Sort roles within each track by level
  Object.values(rolesByTrack).forEach((roles) => {
    roles.sort((a, b) => a.level - b.level);
  });

  const tracks: Track[] = ['trainee', 'intern', 'professional', 'management', 'leadership'];

  return (
    <div className="h-full overflow-auto">
      <div className="p-12 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10"
        >
          <div className="flex items-start justify-between">
            <div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 mb-4"
              >
                <h1 className="text-4xl font-bold text-[#0D0D0D]">
                  {expertise?.name}
                </h1>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="px-4 py-1.5 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: segmentColors[expertise?.segment || 'BUILD'] }}
                >
                  {expertise?.segment}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm text-[#0D0D0D] text-sm font-medium border border-[#40916C]/20">
                  {expertise?.group}
                </span>
                {expertise?.flag && (
                  <span className="px-4 py-1.5 rounded-full bg-[#0D0D0D] text-white text-sm font-medium">
                    {expertise.flag}
                  </span>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm text-[#0D0D0D] hover:bg-white/80 transition-all flex items-center gap-2 border border-[#40916C]/20 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-white/60 backdrop-blur-sm text-[#0D0D0D] hover:bg-white/80 transition-all border border-[#40916C]/20 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Career Path Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {/* Column Headers */}
          <div className="flex gap-6 mb-8">
            {tracks.map((track, index) => {
              const count = rolesByTrack[track]?.length || 0;
              const config = trackConfig[track];
              return (
                <motion.div
                  key={track}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex-1"
                  style={{ minWidth: track === 'trainee' || track === 'intern' ? '180px' : '240px' }}
                >
                  <div
                    className="px-6 py-3 rounded-2xl text-center backdrop-blur-sm border-2"
                    style={{
                      backgroundColor: config.bg,
                      borderColor: `${config.color}40`,
                    }}
                  >
                    <div className="text-[#0D0D0D] text-sm font-bold mb-1">
                      {config.label}
                    </div>
                    <div className="text-xs font-medium" style={{ color: config.color }}>
                      {count} {count === 1 ? 'level' : 'levels'}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Main Diagram Area with SVG Overlay */}
          <div className="relative">
            {/* Track Columns */}
            <div className="flex gap-6">
              {tracks.map((track) => {
                const roles = rolesByTrack[track] || [];
                const config = trackConfig[track];

                return (
                  <div
                    key={track}
                    className="flex-1 min-h-[600px] rounded-3xl p-6 backdrop-blur-sm border-2"
                    style={{
                      backgroundColor: config.bg,
                      borderColor: `${config.color}30`,
                      minWidth: track === 'trainee' || track === 'intern' ? '180px' : '240px',
                    }}
                  >
                    <div className="space-y-8">
                      {roles.map((role, index) => (
                        <RoleCard
                          key={role.id}
                          role={role}
                          trackColor={config.color}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SVG Connectors Layer */}
            <PathConnectors
              roles={careerPath.roles}
              connections={careerPath.connections}
              rolesByTrack={rolesByTrack}
              trackConfig={trackConfig}
            />
          </div>

          {/* Legend */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 bg-white/80 backdrop-blur-xl border-2 border-[#40916C]/20 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-10 text-sm flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-6 h-1 bg-[#40916C] rounded-full" />
                <span className="text-[#0D0D0D] font-medium">Promotion</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-1 bg-[#2D6A4F] rounded-full opacity-50" style={{ borderTop: '2px dashed #40916C' }} />
                <span className="text-[#0D0D0D] font-medium">Transferable</span>
              </div>
              <div className="h-6 w-px bg-[#D8F3DC]" />
              {Object.entries(trackConfig).map(([track, config]) => (
                <div key={track} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.color }} />
                  <span className="text-[#0D0D0D] text-sm font-medium">{config.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
