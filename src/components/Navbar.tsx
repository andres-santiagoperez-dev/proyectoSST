'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Rol } from '@/types';
import { 
  ShieldCheck, 
  HeartHandshake, 
  AlertTriangle, 
  LayoutDashboard, 
  Building2, 
  User, 
  Bell, 
  Volume2, 
  VolumeX,
  Clock
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { usuarioActual, rolActivo, cambiarRol, esLiderSST, esGerencia, esCOPASST } = useAuth();
  const [segundosRestantes, setSegundosRestantes] = useState<number>(3600); // 60 min por defecto
  const [sonidoHabilitado, setSonidoHabilitado] = useState<boolean>(true);

  // Temporizador de pausa activa en barra superior
  useEffect(() => {
    const timer = setInterval(() => {
      setSegundosRestantes((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatearTiempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const navLinks = [
    {
      href: '/',
      label: 'Portal Empresa (Blueprint)',
      icon: Building2,
      badge: 'Público',
      themeHint: 'blueprint',
    },
    {
      href: '/pausas-activas',
      label: 'Pausas Activas (Vital)',
      icon: HeartHandshake,
      badge: 'Ergonomía',
      themeHint: 'vital',
    },
    {
      href: '/reporte-campo',
      label: 'Reportar Novedad',
      icon: AlertTriangle,
      badge: '< 60 seg',
      themeHint: 'campo',
    },
    {
      href: '/admin-dashboard',
      label: 'Consola SST (Andon)',
      icon: LayoutDashboard,
      badge: 'Gestión',
      themeHint: 'industrial',
      requiereAdmin: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-cyan-500/20 text-white">
      {/* Barra superior de telemetría y rol */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between text-xs border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="flex items-center text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
            SISTEMA SG-SST COLOMBIA EN LÍNEA
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300 font-mono">
            Res. 0312/2019 • Res. 1843/2025 • Dec. 1072/2015
          </span>
        </div>

        {/* Temporizador y selector de rol de pruebas */}
        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          {/* Widget Alarma de Pausa */}
          <Link
            href="/pausas-activas"
            className="flex items-center space-x-1.5 bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30 hover:bg-emerald-900/80 transition-colors font-mono"
            title="Próxima pausa activa programada"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pausa en: {formatearTiempo(segundosRestantes)}</span>
          </Link>

          <button
            onClick={() => setSonidoHabilitado(!sonidoHabilitado)}
            className="text-slate-400 hover:text-white p-1 rounded"
            title={sonidoHabilitado ? 'Sonido de alarma habilitado' : 'Sonido silenciado'}
            aria-label="Alternar sonido"
          >
            {sonidoHabilitado ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {/* Selector interactivo de Rol para pruebas de auditoría y permisos */}
          <div className="flex items-center space-x-1.5 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <User className="w-3.5 h-3.5 text-amber-400" />
            <label htmlFor="selector-rol" className="text-slate-400">Rol:</label>
            <select
              id="selector-rol"
              value={rolActivo}
              onChange={(e) => cambiarRol(e.target.value as Rol)}
              className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="VISITANTE" className="bg-slate-900 text-white">Visitante (Público)</option>
              <option value="COLABORADOR" className="bg-slate-900 text-white">Colaborador (Planta/Oficina)</option>
              <option value="LIDER_SST" className="bg-slate-900 text-white">Líder SST (Administrador)</option>
              <option value="GERENCIA" className="bg-slate-900 text-white">Alta Dirección / Gerencia</option>
              <option value="COPASST" className="bg-slate-900 text-white">COPASST / Vigía</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navegación Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo SafePulse SST */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                  Safe<span className="text-cyan-400">Pulse</span>
                </span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded font-mono">
                  SST
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-sans">
                Prevención, Ergonomía y Cumplimiento
              </p>
            </div>
          </Link>

          {/* Menú de Navegación por Ámbitos */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.requiereAdmin && !(esLiderSST || esGerencia || esCOPASST)) {
                return null;
              }
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-cyan-900/60 text-cyan-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {link.badge}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Estado de Sesión / Botón Rápido */}
          <div className="flex items-center space-x-2">
            {usuarioActual ? (
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-200">{usuarioActual.nombre}</span>
                <span className="text-[10px] text-cyan-400 font-mono">{usuarioActual.cargo}</span>
              </div>
            ) : (
              <span className="text-xs text-slate-400 hidden lg:inline font-mono">Modo Invitado</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
