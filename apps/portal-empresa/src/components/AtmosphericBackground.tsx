'use client';

import React, { useEffect, useRef } from 'react';

export default function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // 28 partículas sutiles de polvo de luz ambiental (Unseen Studio style)
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15, // Deriva suave hacia arriba
      opacity: Math.random() * 0.35 + 0.1,
      fadeSpeed: Math.random() * 0.006 + 0.003,
      fadeDir: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.6 ? 'rgba(20, 184, 166, ' : 'rgba(26, 86, 219, ',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Rebote o reinicio en los bordes
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulso suave de opacidad
        p.opacity += p.fadeSpeed * p.fadeDir;
        if (p.opacity > 0.45) {
          p.opacity = 0.45;
          p.fadeDir = -1;
        } else if (p.opacity < 0.08) {
          p.opacity = 0.08;
          p.fadeDir = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Resplandores arquitectónicos difusos */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/20 blur-[140px]" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-100/15 blur-[120px]" />
      
      {/* Lienzo de partículas reactivas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  );
}
