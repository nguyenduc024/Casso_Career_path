import { useRef, useState, type MouseEvent } from 'react';
import type { Role } from '../data/careerPaths';
import { getLevelLabel } from '../utils/careerPathLayout';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RoleCardProps {
  role: Role;
  trackColor: string;
  trackIndex: number;
  rowIndex: number;
  isSelected?: boolean;
  isHovered?: boolean;
  onSelect?: (roleId: string) => void;
  onHover?: (roleId: string | null) => void;
}

export function RoleCard({
  role,
  trackColor,
  trackIndex,
  rowIndex,
  isSelected = false,
  isHovered = false,
  onSelect,
  onHover,
}: RoleCardProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const levelLabel = getLevelLabel(role);
  const enterDelay = trackIndex * 80 + rowIndex * 50;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = ++rippleId.current;
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 520);
    onSelect?.(role.id);
  };

  return (
    <div
      data-role-id={role.id}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(role.id);
        }
      }}
      onMouseEnter={() => onHover?.(role.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={handleClick}
      className="role-card-enter relative cursor-pointer w-full max-w-[240px] mx-auto outline-none"
      style={{ animationDelay: `${enterDelay}ms` }}
    >
      <div
        className={[
          'relative rounded-[12px] border bg-cp-surface px-3.5 py-3 overflow-hidden',
          'transition-all duration-200 ease-out',
          isSelected ? 'role-card-selected scale-[1.02]' : isHovered ? '-translate-y-0.5' : '',
        ].join(' ')}
        style={{
          borderColor: isSelected ? 'var(--cp-highlight)' : 'var(--cp-card-border)',
          borderLeftWidth: isSelected ? 4 : 3,
          borderLeftColor: isSelected ? 'var(--cp-highlight)' : trackColor,
          boxShadow: isHovered ? 'var(--cp-glow)' : isSelected ? 'var(--cp-shadow)' : 'none',
        }}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="role-card-ripple"
            style={{ left: r.x, top: r.y }}
          />
        ))}

        {levelLabel && (
          <span className="absolute top-2.5 right-2.5 font-mono text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--cp-primary)]/15 text-cp-primary">
            {levelLabel}
          </span>
        )}

        <p
          className={[
            'text-[13px] font-medium leading-snug line-clamp-2 text-cp',
            levelLabel ? 'pr-10' : '',
          ].join(' ')}
        >
          {role.title}
        </p>
      </div>
    </div>
  );
}
