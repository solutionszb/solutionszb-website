import { useEffect, useRef } from 'react';

interface Polygon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  sides: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Get theme colors from CSS variables
    const getThemeColor = (varName: string) => {
      const hsl = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      return `hsl(${hsl})`;
    };

    const polygons: Polygon[] = [];
    const polygonCount = 15;

    // Initialize polygons
    for (let i = 0; i < polygonCount; i++) {
      polygons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        sides: [3, 5, 6][Math.floor(Math.random() * 3)], // triangle, pentagon, hexagon
        size: 30 + Math.random() * 60,
        color: ['--primary', '--secondary', '--accent'][Math.floor(Math.random() * 3)],
        opacity: 0.2 + Math.random() * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      });
    }

    const drawPolygon = (polygon: Polygon) => {
      ctx.save();
      ctx.translate(polygon.x, polygon.y);
      ctx.rotate(polygon.rotation);

      // Parallax effect based on mouse position
      const parallaxX = (mousePos.current.x - canvas.width / 2) * 0.01;
      const parallaxY = (mousePos.current.y - canvas.height / 2) * 0.01;
      ctx.translate(parallaxX, parallaxY);

      ctx.beginPath();
      const angle = (Math.PI * 2) / polygon.sides;
      
      for (let i = 0; i < polygon.sides; i++) {
        const x = polygon.size * Math.cos(i * angle);
        const y = polygon.size * Math.sin(i * angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      const color = getThemeColor(polygon.color);
      ctx.fillStyle = color.replace(')', ` / ${polygon.opacity})`).replace('hsl(', 'hsla(');
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      polygons.forEach(polygon => {
        // Update position
        polygon.x += polygon.vx;
        polygon.y += polygon.vy;
        polygon.rotation += polygon.rotationSpeed;

        // Wrap around edges
        if (polygon.x < -polygon.size) polygon.x = canvas.width + polygon.size;
        if (polygon.x > canvas.width + polygon.size) polygon.x = -polygon.size;
        if (polygon.y < -polygon.size) polygon.y = canvas.height + polygon.size;
        if (polygon.y > canvas.height + polygon.size) polygon.y = -polygon.size;

        drawPolygon(polygon);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
};
