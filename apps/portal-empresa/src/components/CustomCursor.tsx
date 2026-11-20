'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'card' | 'hidden'>('default');
  const [isOnDarkBg, setIsOnDarkBg] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Solo activar en dispositivos con puntero fino (mouse) y sin reduced-motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || isReduced) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    // Función para detectar si el cursor está sobre un fondo oscuro o claro
    const detectDarkBackground = (target: HTMLElement | null): boolean => {
      if (!target) return false;

      // 1. Detección rápida por atributos y contenedores oscuros conocidos o clases Tailwind
      if (
        target.closest(
          'header, footer, [data-theme="dark"], [data-bg="dark"], [class*="bg-[#0E1B2F]"], [class*="bg-[#0B132B]"], [class*="bg-[#080E1E]"], [class*="bg-[#0E1726]"], [class*="bg-[#111C38]"], [class*="from-[#0E1B2F]"], [class*="from-[#0B132B]"], [class*="from-[#111C38]"], [class*="bg-slate-900"], [class*="bg-slate-950"], [class*="bg-black"]'
        )
      ) {
        return true;
      }

      // 2. Comprobación del color de fondo computado y luminancia
      let curr: HTMLElement | null = target;
      while (curr && curr !== document.documentElement && curr !== document.body) {
        const style = window.getComputedStyle(curr);

        // Si tiene texto blanco con fondo personalizado o gradiente
        if ((style.color === 'rgb(255, 255, 255)' || style.color === '#ffffff') && curr.className.includes('bg-')) {
          const bgImg = style.backgroundImage;
          if (bgImg && bgImg !== 'none') {
            return true; // Gradiente oscuro con texto blanco
          }
        }

        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            // Fórmula de luminancia ITU-R BT.709
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return luminance < 140; // < 140 es fondo oscuro, >= 140 es fondo blanco/claro
          }
        }
        curr = curr.parentElement;
      }

      return false; // Por defecto es fondo claro (#F8FAFC / #FFFFFF)
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Mover el punto interior inmediatamente
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Detectar fondo en tiempo real en cada movimiento
      const target = e.target as HTMLElement | null;
      if (target) {
        const isDark = detectDarkBackground(target);
        setIsOnDarkBg((prev) => (prev !== isDark ? isDark : prev));
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Detección de elementos interactivos bajo el puntero
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isDark = detectDarkBackground(target);
      setIsOnDarkBg(isDark);

      const cursorHide = target.closest('[data-cursor="hide"]');
      if (cursorHide) {
        setCursorType('hidden');
        return;
      }

      const cursorCard = target.closest('[data-cursor="card"], .cursor-card');
      if (cursorCard) {
        setCursorType('card');
        return;
      }

      const interactive = target.closest('button, a, input, select, textarea, [role="button"], [data-cursor="hover"]');
      if (interactive) {
        setCursorType('hover');
        return;
      }

      setCursorType('default');
    };

    // Bucle de animación física suave (Lerp) para el anillo exterior
    const animateRing = () => {
      const lerp = 0.2; // Suavidad inercial
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!enabled) return null;

  // Clases dinámicas según si está en fondo blanco/claro (GRIS OSCURO) o en fondo oscuro (BLANCO/CIAN)
  const dotColorClass = isOnDarkBg
    ? (cursorType === 'hover' ? 'bg-[#2DD4BF] scale-150' : 'bg-white shadow-xs')
    : (cursorType === 'hover' ? 'bg-[#0E1B2F] scale-150' : 'bg-[#1E293B] shadow-xs');

  const ringColorClass = isOnDarkBg
    ? (
        // EN FONDO OSCURO (Card Nueva Experiencia, Hero, Navbar, Footer, Visor CAD): BLANCO / CIAN NEÓN
        cursorType === 'hover'
          ? '-ml-5 -mt-5 w-10 h-10 border-2 border-[#2DD4BF] bg-[#2DD4BF]/20 scale-110 shadow-md'
          : cursorType === 'card'
          ? '-ml-7 -mt-7 w-14 h-14 border-2 border-white/90 bg-white/20 backdrop-blur-[1px] text-[9px] font-bold text-white tracking-wider'
          : '-ml-3.5 -mt-3.5 w-7 h-7 border-2 border-white/80 bg-white/10 shadow-xs'
      )
    : (
        // EN FONDO BLANCO / CLARO: GRIS OSCURO NÍTIDO (#1E293B / #334155)
        cursorType === 'hover'
          ? '-ml-5 -mt-5 w-10 h-10 border-2 border-[#0E1B2F] bg-slate-900/15 scale-110 shadow-md'
          : cursorType === 'card'
          ? '-ml-7 -mt-7 w-14 h-14 border-2 border-[#1E293B] bg-slate-800/15 backdrop-blur-[1px] text-[9px] font-bold text-[#0E1B2F] tracking-wider'
          : '-ml-3.5 -mt-3.5 w-7 h-7 border-2 border-[#334155] bg-slate-900/10 shadow-xs'
      );

  return (
    <>
      {/* Punto interior (reacciona 1:1 con el cursor) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-opacity duration-150 will-change-transform ${
          visible && cursorType !== 'hidden' ? 'opacity-100' : 'opacity-0'
        } ${dotColorClass}`}
      />

      {/* Anillo exterior inercial con morphing de estado */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-200 ease-out will-change-transform flex items-center justify-center font-mono ${
          visible && cursorType !== 'hidden' ? 'opacity-100' : 'opacity-0'
        } ${ringColorClass}`}
      >
        {cursorType === 'card' && <span>VER</span>}
      </div>
    </>
  );
}
