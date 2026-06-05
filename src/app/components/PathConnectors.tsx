import { useEffect, useId, useState } from 'react';
import type { Role, Connection } from '../data/careerPaths';
import { DIAGRAM_CANVAS_ATTR } from '../utils/careerPathLayout';
import { getPositionInContainer } from '../utils/connectorPosition';

interface PathConnectorsProps {
  roles: Role[];
  connections: Connection[];
  hoveredRoleId: string | null;
  selectedRoleId: string | null;
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Anchor {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const STROKE = 1.44;
const CARD_PAD = 12;
const ARROW_SIZE = 8.3;

/** Màu xanh lá thống nhất cho đường + đầu mũi tên (theo theme sáng/tối) */
const CONNECTOR_GREEN = 'var(--cp-primary)';
const CONNECTOR_GREEN_ACTIVE = 'var(--cp-highlight)';

const ROW_ALIGN_THRESHOLD = 6;

function isDifferentRow(from: Position, to: Position): boolean {
  return Math.abs(from.y - to.y) > ROW_ALIGN_THRESHOLD;
}

function getAnchors(
  from: Position,
  to: Position,
  type: Connection['type'],
  fromRole?: Role,
  toRole?: Role
): Anchor {
  if (type === 'vertical') {
    return {
      x1: from.x,
      y1: from.y + from.height / 2 + CARD_PAD,
      x2: to.x,
      y2: to.y - to.height / 2 - CARD_PAD,
    };
  }

  const goingRight = to.x >= from.x;
  const exitX = goingRight ? from.x + from.width / 2 + CARD_PAD : from.x - from.width / 2 - CARD_PAD;
  const enterX = goingRight ? to.x - to.width / 2 - CARD_PAD : to.x + to.width / 2 + CARD_PAD;

  // Khác hàng: ngang ra cạnh thẻ → xuống/ lên tại cột đích (giống mũi tên xanh mẫu)
  if (isDifferentRow(from, to)) {
    const isMgmtToProductHead =
      fromRole?.track === 'management' &&
      toRole?.track === 'leadership' &&
      toRole.level === 4;

    const cornerX = to.x;
    const endY = isMgmtToProductHead ? to.y - to.height / 2 - CARD_PAD : to.y;

    return { x1: exitX, y1: from.y, x2: cornerX, y2: endY };
  }

  const midY = (from.y + to.y) / 2;
  return { x1: exitX, y1: midY, x2: enterX, y2: midY };
}

/** Cùng hàng: thẳng ngang. Khác hàng: chữ L (ngang rồi dọc tại cột đích) */
function buildPath(anchor: Anchor, orthogonal: boolean): string {
  const { x1, y1, x2, y2 } = anchor;

  if (orthogonal) {
    return `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`;
  }

  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

export function PathConnectors({
  roles,
  connections,
  hoveredRoleId,
  selectedRoleId,
}: PathConnectorsProps) {
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const updatePositions = () => {
      const canvas = document.querySelector(`[${DIAGRAM_CANVAS_ATTR}]`) as HTMLElement | null;
      if (!canvas) return;

      const newPositions: Record<string, Position> = {};

      roles.forEach((role) => {
        const element = canvas.querySelector(`[data-role-id="${role.id}"]`) as HTMLElement | null;
        if (!element) return;

        newPositions[role.id] = getPositionInContainer(canvas, element);
      });

      if (Object.keys(newPositions).length > 0) {
        setPositions(newPositions);
      }
    };

    updatePositions();
    const raf = requestAnimationFrame(updatePositions);
    const timeout = window.setTimeout(updatePositions, 500);

    const canvas = document.querySelector(`[${DIAGRAM_CANVAS_ATTR}]`);
    const resizeObserver =
      canvas && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updatePositions())
        : null;
    resizeObserver?.observe(canvas as Element);

    window.addEventListener('resize', updatePositions);
    window.addEventListener('beforeprint', updatePositions);
    window.addEventListener('casso:recalc-connectors', updatePositions);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('beforeprint', updatePositions);
      window.removeEventListener('casso:recalc-connectors', updatePositions);
    };
  }, [roles, connections]);

  if (Object.keys(positions).length === 0) {
    return null;
  }

  const highlightFrom = hoveredRoleId ?? selectedRoleId;
  const arrowEndId = `arrow-end-${uid}`;
  const arrowStartId = `arrow-start-${uid}`;

  const markerProps = {
    viewBox: '0 0 10 10',
    refX: 10,
    refY: 5,
    markerWidth: ARROW_SIZE,
    markerHeight: ARROW_SIZE,
    markerUnits: 'userSpaceOnUse' as const,
    orient: 'auto' as const,
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 2 }}
      aria-hidden
    >
      <defs>
        <marker id={arrowEndId} {...markerProps}>
          <path d="M0,1.5 L10,5 L0,8.5 Z" fill={CONNECTOR_GREEN} />
        </marker>
        <marker
          id={arrowStartId}
          {...markerProps}
          refX={0}
          orient="auto-start-reverse"
        >
          <path d="M0,1.5 L10,5 L0,8.5 Z" fill={CONNECTOR_GREEN} />
        </marker>
        <marker id={`${arrowEndId}-hi`} {...markerProps}>
          <path d="M0,1.5 L10,5 L0,8.5 Z" fill={CONNECTOR_GREEN_ACTIVE} />
        </marker>
        <marker
          id={`${arrowStartId}-hi`}
          {...markerProps}
          refX={0}
          orient="auto-start-reverse"
        >
          <path d="M0,1.5 L10,5 L0,8.5 Z" fill={CONNECTOR_GREEN_ACTIVE} />
        </marker>
      </defs>

      {connections.map((conn, index) => {
        const from = positions[conn.from];
        const to = positions[conn.to];
        if (!from || !to) return null;

        const pathId = `${uid}-${conn.from}-${conn.to}-${index}`;
        const fromRole = roles.find((r) => r.id === conn.from);
        const toRole = roles.find((r) => r.id === conn.to);
        const anchor = getAnchors(from, to, conn.type, fromRole, toRole);
        const orthogonal =
          conn.type !== 'vertical' && isDifferentRow(from, to);
        const d = buildPath(anchor, orthogonal);

        const isHighlight =
          highlightFrom !== null &&
          (conn.from === highlightFrom || conn.to === highlightFrom);

        const isBidirectional = conn.type === 'bidirectional';
        const baseDelay = 0.35 + index * 0.06;

        const strokeColor = isHighlight ? CONNECTOR_GREEN_ACTIVE : CONNECTOR_GREEN;
        const endMarker = isHighlight ? `${arrowEndId}-hi` : arrowEndId;
        const startMarker = isHighlight ? `${arrowStartId}-hi` : arrowStartId;

        return (
          <path
            key={pathId}
            d={d}
            fill="none"
            stroke={strokeColor}
            strokeWidth={STROKE}
            pathLength={isBidirectional ? undefined : 1}
            strokeDasharray={isBidirectional ? '6 4' : undefined}
            markerEnd={`url(#${endMarker})`}
            markerStart={isBidirectional ? `url(#${startMarker})` : undefined}
            className={[
              isBidirectional ? 'connector-path-bidi' : 'connector-path',
              isHighlight ? 'connector-path--highlight' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              animationDelay: `${baseDelay}s`,
            }}
          />
        );
      })}
    </svg>
  );
}
