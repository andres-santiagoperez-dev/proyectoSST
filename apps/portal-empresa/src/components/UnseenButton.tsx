'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';

interface UnseenButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'dark' | 'outline' | 'emerald' | 'ghost';
  arrow?: 'up-right' | 'right' | 'down' | 'none';
  className?: string;
  dataCursor?: string;
  title?: string;
}

export default function UnseenButton({
  children,
  href,
  onClick,
  variant = 'primary',
  arrow = 'right',
  className = '',
  dataCursor = 'hover',
  title,
}: UnseenButtonProps) {
  // Estilos de variante según la paleta obligatoria
  const variantStyles = {
    primary: 'bg-[#1A56DB] hover:bg-blue-600 text-white shadow-md shadow-[#1A56DB]/20',
    dark: 'bg-[#0E1B2F] hover:bg-slate-800 text-white border border-[#1E293B]',
    outline: 'bg-white hover:bg-slate-50 text-[#0E1B2F] border border-[#64748B]/30 hover:border-[#1A56DB]/60',
    emerald: 'bg-[#10B981] hover:bg-emerald-600 text-[#0E1B2F] font-bold shadow-md shadow-[#10B981]/20',
    ghost: 'bg-transparent text-slate-300 hover:text-white',
  }[variant];

  // Renderizador de flecha animada
  const renderArrow = () => {
    if (arrow === 'none') return null;
    if (arrow === 'up-right') {
      return (
        <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      );
    }
    if (arrow === 'down') {
      return (
        <ArrowDown className="w-4 h-4 ml-2 transition-transform duration-300 ease-out group-hover:translate-y-1 shrink-0" />
      );
    }
    return (
      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0" />
    );
  };

  // Contenido interno con efecto rollover (texto original + texto clonado)
  const innerContent = (
    <>
      <span className="relative inline-block overflow-hidden leading-tight h-[1.25em]">
        {/* Texto original que sube */}
        <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full will-change-transform">
          {children}
        </span>
        {/* Texto clonado que entra desde abajo */}
        <span 
          aria-hidden="true"
          className="absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full will-change-transform"
        >
          {children}
        </span>
      </span>
      {renderArrow()}
    </>
  );

  const baseClasses = `group relative inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-2xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 select-none ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={baseClasses}
        data-cursor={dataCursor}
        title={title}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      data-cursor={dataCursor}
      title={title}
    >
      {innerContent}
    </button>
  );
}
