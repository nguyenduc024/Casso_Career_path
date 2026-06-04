import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onExplore: () => void;
}

export function EmptyState({ onExplore }: EmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center p-12">
      <div className="text-center max-w-lg">
        {/* Illustration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="mb-12 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-40 h-40 rounded-3xl bg-gradient-to-br from-[#40916C] to-[#2D6A4F] flex items-center justify-center shadow-2xl shadow-[#40916C]/30"
            >
              <Sparkles className="w-20 h-20 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  y: [-20, 20, -20],
                  x: Math.cos(i * 60) * 80,
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#52B788] rounded-full"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(60px)`
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-[#0D0D0D] mb-4">
            Your Career Journey
            <br />
            <span className="text-[#40916C]">Starts Here</span>
          </h2>
          <p className="text-[#1B4332]/70 text-lg mb-10">
            Choose an expertise to explore growth paths
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="group relative bg-gradient-to-r from-[#40916C] to-[#2D6A4F] text-white px-10 py-4 rounded-xl font-semibold shadow-xl shadow-[#40916C]/30 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Start Exploring
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
