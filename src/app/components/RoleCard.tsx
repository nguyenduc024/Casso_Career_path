import { useState } from 'react';
import { motion } from 'motion/react';
import type { Role } from '../data/careerPaths';

interface RoleCardProps {
  role: Role;
  trackColor: string;
  index: number;
}

export function RoleCard({ role, trackColor, index }: RoleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      data-role-id={role.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer group"
    >
      <motion.div
        className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 min-h-[70px] border-2 transition-all duration-300"
        style={{
          borderColor: isHovered ? trackColor : 'transparent',
          boxShadow: isHovered
            ? `0 8px 24px ${trackColor}40, 0 0 0 4px ${trackColor}20`
            : '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        {/* Gradient accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{
            background: `linear-gradient(to bottom, ${trackColor}, ${trackColor}80)`,
          }}
        />

        {/* Level Badge */}
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          className="absolute -top-2 -right-2 text-[10px] font-mono px-2.5 py-1 rounded-full font-bold"
          style={{
            background: `linear-gradient(135deg, ${trackColor}, ${trackColor}CC)`,
            color: '#fff',
            boxShadow: `0 2px 8px ${trackColor}40`,
          }}
        >
          L{role.level}
        </motion.div>

        {/* Role Title */}
        <div className="text-sm font-semibold text-[#0D0D0D] pr-8 leading-tight">
          {role.title}
        </div>

        {/* Animated glow effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(circle at center, ${trackColor}15, transparent 70%)`,
            }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-4 py-2 bg-[#0D0D0D] text-white text-xs rounded-xl whitespace-nowrap shadow-2xl z-50"
        >
          {role.title} • Level {role.level}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0D0D0D]" />
        </motion.div>
      )}
    </motion.div>
  );
}
