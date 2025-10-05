import React, { useRef, useEffect, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  gridX: number;
  gridY: number;
}

interface Connection {
  from: Dot;
  to: Dot;
  path: Dot[];
  color: string;
  offset: number;
  speed: number; // particle-line-speed
}

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const animationFrameRef = useRef<number>();
  const dotsGridRef = useRef<Map<string, Dot>>(new Map());

  // Color palette
  const colors = [
    'rgba(198, 63, 96, 0.4)',   // Electric Magenta
    'rgba(234, 129, 155, 0.4)',  // Coral Energy
    'rgba(216, 49, 91, 0.4)',    // Ruby Accent
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSpacing = 50; // Space between dots
    const dotRadius = 2;
    const endpointRadius = 6; // 3x size for start/end dots
    const minConnectionDistance = 10; // Min 10 grid spaces apart
    const maxConnectionDistance = 14; // Max 14 grid spaces apart

    // particle-line-speed: Speed range for flowing dots
    const minSpeed = 0.1;
    const maxSpeed = 0.7;

    let animationOffset = 0;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateConnections();
    };

    const getDotKey = (gridX: number, gridY: number): string => {
      return `${gridX},${gridY}`;
    };

    const generateDots = (): Dot[] => {
      if (!canvas) return [];
      const dots: Dot[] = [];
      const dotsMap = new Map<string, Dot>();
      const cols = Math.ceil(canvas.width / gridSpacing) + 1;
      const rows = Math.ceil(canvas.height / gridSpacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dot = {
            x: col * gridSpacing,
            y: row * gridSpacing,
            gridX: col,
            gridY: row,
          };
          dots.push(dot);
          dotsMap.set(getDotKey(col, row), dot);
        }
      }

      dotsGridRef.current = dotsMap;
      return dots;
    };

    const findGridPath = (from: Dot, to: Dot): Dot[] => {
      const path: Dot[] = [from];
      const dotsMap = dotsGridRef.current;

      // Decide randomly whether to go horizontal-first or vertical-first
      const horizontalFirst = Math.random() > 0.5;

      if (horizontalFirst) {
        // Move horizontally first, then vertically
        const deltaX = to.gridX - from.gridX;
        const stepX = deltaX > 0 ? 1 : -1;

        for (let i = 1; i <= Math.abs(deltaX); i++) {
          const nextGridX = from.gridX + (stepX * i);
          const dot = dotsMap.get(getDotKey(nextGridX, from.gridY));
          if (dot) path.push(dot);
        }

        const deltaY = to.gridY - from.gridY;
        const stepY = deltaY > 0 ? 1 : -1;

        for (let i = 1; i <= Math.abs(deltaY); i++) {
          const nextGridY = from.gridY + (stepY * i);
          const dot = dotsMap.get(getDotKey(to.gridX, nextGridY));
          if (dot) path.push(dot);
        }
      } else {
        // Move vertically first, then horizontally
        const deltaY = to.gridY - from.gridY;
        const stepY = deltaY > 0 ? 1 : -1;

        for (let i = 1; i <= Math.abs(deltaY); i++) {
          const nextGridY = from.gridY + (stepY * i);
          const dot = dotsMap.get(getDotKey(from.gridX, nextGridY));
          if (dot) path.push(dot);
        }

        const deltaX = to.gridX - from.gridX;
        const stepX = deltaX > 0 ? 1 : -1;

        for (let i = 1; i <= Math.abs(deltaX); i++) {
          const nextGridX = from.gridX + (stepX * i);
          const dot = dotsMap.get(getDotKey(nextGridX, to.gridY));
          if (dot) path.push(dot);
        }
      }

      return path;
    };

    const generateConnections = () => {
      const dots = generateDots();
      const newConnections: Connection[] = [];

      // Create connections between random dots that are 10-14 spaces apart
      const numConnections = Math.min(12, Math.floor(dots.length / 30));

      for (let i = 0; i < numConnections; i++) {
        const fromDot = dots[Math.floor(Math.random() * dots.length)];

        // Find dots that are 10-14 grid spaces away (Manhattan distance)
        const validTargets = dots.filter(dot => {
          const manhattanDistance =
            Math.abs(dot.gridX - fromDot.gridX) +
            Math.abs(dot.gridY - fromDot.gridY);
          return manhattanDistance >= minConnectionDistance &&
                 manhattanDistance <= maxConnectionDistance;
        });

        if (validTargets.length > 0) {
          const toDot = validTargets[Math.floor(Math.random() * validTargets.length)];
          const path = findGridPath(fromDot, toDot);

          // particle-line-speed: Assign random speed within range
          const randomSpeed = minSpeed + Math.random() * (maxSpeed - minSpeed);

          newConnections.push({
            from: fromDot,
            to: toDot,
            path,
            color: colors[Math.floor(Math.random() * colors.length)],
            offset: Math.random() * 100,
            speed: randomSpeed,
          });
        }
      }

      setConnections(newConnections);
    };

    const drawDots = (dots: Dot[], endpointDots: Set<string>) => {
      if (!ctx) return;

      dots.forEach(dot => {
        const dotKey = getDotKey(dot.gridX, dot.gridY);
        const isEndpoint = endpointDots.has(dotKey);
        const radius = isEndpoint ? endpointRadius : dotRadius;

        ctx.fillStyle = isEndpoint
          ? 'rgba(234, 129, 155, 0.6)'
          : 'rgba(198, 63, 96, 0.25)';

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawConnection = (connection: Connection, animationOffset: number) => {
      if (!ctx || connection.path.length < 2) return;

      const { path, color, offset, speed } = connection;

      // Calculate total path length in segments
      const totalSegments = path.length - 1;

      // particle-line-speed: Apply individual speed to animation
      // Calculate flowing dot position (0 to totalSegments)
      const cycleLength = 200; // Length of one complete cycle
      const progress = ((animationOffset * speed + offset) % cycleLength) / cycleLength;
      const dotPosition = progress * totalSegments;

      // Draw the line with varying widths
      for (let i = 0; i < path.length - 1; i++) {
        const segmentStart = i;
        const segmentEnd = i + 1;
        const segmentMid = i + 0.5;

        // Calculate distance from flowing dot to this segment
        const distanceToDot = Math.abs(dotPosition - segmentMid);

        // Width varies based on proximity to dot (creates squeeze effect)
        const baseWidth = 2;
        const maxWidth = 12;
        const influenceRange = 2; // How many segments away the dot affects

        let lineWidth = baseWidth;
        if (distanceToDot < influenceRange) {
          const influence = 1 - (distanceToDot / influenceRange);
          lineWidth = baseWidth + (maxWidth - baseWidth) * influence;
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(path[segmentStart].x, path[segmentStart].y);
        ctx.lineTo(path[segmentEnd].x, path[segmentEnd].y);
        ctx.stroke();
      }

      // Draw the flowing dot
      const dotSegmentIndex = Math.floor(dotPosition);
      const dotSegmentProgress = dotPosition - dotSegmentIndex;

      if (dotSegmentIndex < path.length - 1) {
        const startPoint = path[dotSegmentIndex];
        const endPoint = path[dotSegmentIndex + 1];

        // Interpolate position
        const dotX = startPoint.x + (endPoint.x - startPoint.x) * dotSegmentProgress;
        const dotY = startPoint.y + (endPoint.y - startPoint.y) * dotSegmentProgress;

        // Draw the flowing dot
        ctx.fillStyle = color.replace('0.4)', '0.9)'); // More opaque
        ctx.beginPath();
        ctx.arc(dotX, dotY, 7.5, 0, Math.PI * 2); // radius 7.5 (diameter 15)
        ctx.fill();

        // Add a glow effect
        ctx.fillStyle = color.replace('0.4)', '0.3)');
        ctx.beginPath();
        ctx.arc(dotX, dotY, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dots = generateDots();

      // Create a set of endpoint dots (start and end of connections)
      const endpointDots = new Set<string>();
      connections.forEach(conn => {
        endpointDots.add(getDotKey(conn.from.gridX, conn.from.gridY));
        endpointDots.add(getDotKey(conn.to.gridX, conn.to.gridY));
      });

      // Draw connections with animation
      connections.forEach(connection => {
        drawConnection(connection, animationOffset);
      });

      // Draw dots on top
      drawDots(dots, endpointDots);

      // Increment animation offset for flowing effect
      animationOffset += 0.5;

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [connections.length]); // Depend on connections length to avoid infinite loop

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CanvasBackground;
