import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import type { Role, Connection, Track } from '../data/careerPaths';

interface PathConnectorsProps {
  roles: Role[];
  connections: Connection[];
  rolesByTrack: Record<Track, Role[]>;
  trackConfig: Record<Track, { label: string; bg: string; color: string }>;
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function PathConnectors({ roles, connections }: PathConnectorsProps) {
  const [positions, setPositions] = useState<Record<string, Position>>({});

  useEffect(() => {
    const updatePositions = () => {
      const newPositions: Record<string, Position> = {};

      roles.forEach((role) => {
        const element = document.querySelector(`[data-role-id="${role.id}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const container = element.closest('.relative');
          const containerRect = container?.getBoundingClientRect();

          if (containerRect) {
            newPositions[role.id] = {
              x: rect.left - containerRect.left + rect.width / 2,
              y: rect.top - containerRect.top + rect.height / 2,
              width: rect.width,
              height: rect.height,
            };
          }
        }
      });

      setPositions(newPositions);
    };

    // Initial update
    updatePositions();

    // Update on resize with debounce
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updatePositions, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [roles]);

  if (Object.keys(positions).length === 0) {
    return null;
  }

  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 1 }}
    >
      <defs>
        {/* Gradient for arrows */}
        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#40916C" />
          <stop offset="100%" stopColor="#2D6A4F" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Arrow markers */}
        <marker
          id="arrowhead"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,7 L10,3.5 z" fill="url(#gradient-green)" />
        </marker>

        <marker
          id="arrowhead-dark"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,7 L10,3.5 z" fill="#2D6A4F" />
        </marker>
      </defs>

      {connections.map((conn, index) => {
        const from = positions[conn.from];
        const to = positions[conn.to];

        if (!from || !to) return null;

        const pathId = `path-${conn.from}-${conn.to}-${index}`;

        if (conn.type === 'vertical') {
          // Straight vertical line within same track
          const x = from.x;
          const y1 = from.y + from.height / 2 + 5;
          const y2 = to.y - to.height / 2 - 5;

          return (
            <g key={pathId}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke="url(#gradient-green)"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
                filter="url(#glow)"
                strokeLinecap="round"
              />
            </g>
          );
        } else if (conn.type === 'horizontal') {
          // Curved horizontal line between tracks
          const x1 = from.x + from.width / 2 + 10;
          const y1 = from.y;
          const x2 = to.x - to.width / 2 - 10;
          const y2 = to.y;

          const midX = (x1 + x2) / 2;
          const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

          return (
            <g key={pathId}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                d={path}
                stroke="#2D6A4F"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead-dark)"
                filter="url(#glow)"
                strokeLinecap="round"
              />
            </g>
          );
        } else if (conn.type === 'bidirectional') {
          // Dashed bidirectional line
          const x1 = from.x + from.width / 2 + 10;
          const y1 = from.y;
          const x2 = to.x - to.width / 2 - 10;
          const y2 = to.y;

          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

          return (
            <g key={pathId}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                d={path}
                stroke="#40916C"
                strokeWidth="3"
                strokeDasharray="8 6"
                fill="none"
                filter="url(#glow)"
                strokeLinecap="round"
              />
              {/* Bidirectional arrows */}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.05, type: "spring" }}
                cx={x1}
                cy={y1}
                r="4"
                fill="#40916C"
              />
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.05, type: "spring" }}
                cx={x2}
                cy={y2}
                r="4"
                fill="#2D6A4F"
              />
              {/* Label */}
              <foreignObject
                x={midX - 50}
                y={midY - 14}
                width="100"
                height="28"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.05, type: "spring" }}
                  className="bg-gradient-to-r from-[#40916C] to-[#2D6A4F] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full text-center shadow-lg"
                >
                  ↔ Transfer
                </motion.div>
              </foreignObject>
            </g>
          );
        }

        return null;
      })}
    </svg>
  );
}
