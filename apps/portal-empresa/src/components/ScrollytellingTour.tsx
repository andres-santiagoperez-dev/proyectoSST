'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Activity,
  HardHat,
  Eye,
  Volume2,
  Zap,
  Boxes,
  HelpCircle
} from 'lucide-react';
import { CAPITULOS_TOUR, CapituloTour } from '@/data/normas-sst';

export default function ScrollytellingTour() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'riesgo' | 'norma' | 'epp'>('riesgo');
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth Scroll Lenis Initialization
  useEffect(() => {
    let lenisInstance: any = null;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isReduced) {
      // Import dinámico de Lenis en cliente
      import('lenis').then((LenisModule) => {
        const Lenis = LenisModule.default;
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
        });

        function raf(time: number) {
          lenisInstance?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }).catch((err) => {
        console.warn('Lenis smooth scroll fallback:', err);
      });
    }

    return () => {
      lenisInstance?.destroy();
    };
  }, []);

  // Intersection Observer para rastrear capítulo activo mientras se scrollea
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapterRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              setActiveChapterIndex(index);
            }
          });
        },
        {
          threshold: [0.4, 0.7],
          rootMargin: '-10% 0px -20% 0px',
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const currentCap = CAPITULOS_TOUR[activeChapterIndex] || CAPITULOS_TOUR[0];

  const jumpToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const target = chapterRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      id="recorrido-sst"
      className="relative py-12 sm:py-20 bg-[#F8FAFC] text-[#0E1B2F] transition-colors"
      aria-label="Recorrido guiado de Seguridad y Salud en el Trabajo"
    >
      {/* Cabecera de la sección estilo editorial Unseen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#64748B]/20">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#0B7A87] font-semibold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Scrollytelling SST // Capítulos de Seguridad</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-outfit text-[#0E1B2F] tracking-tight">
              Recorrido Guiado por Instalaciones
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md font-sans">
            Dosificación interactiva de normas por zonas de trabajo. Conoce los peligros identificados bajo GTC 45 y las reglas de oro aplicables a cada área.
          </p>
        </div>
      </div>

      {/* Contenedor principal con columna de navegación pegajosa (Sticky HUD) y capítulos de scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: HUD Navegador Pegajoso (Desktop Sticky) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white border border-[#64748B]/20 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">
                  Índice de Capítulos
                </span>
                <span className="text-xs font-mono font-bold text-[#1A56DB] bg-blue-50 px-2 py-0.5 rounded-full">
                  {currentCap.capitulo} / 05
                </span>
              </div>

              {/* Lista interactiva de saltos */}
              <nav className="mt-4 space-y-1" aria-label="Progreso de capítulos">
                {CAPITULOS_TOUR.map((cap, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={cap.id}
                      onClick={() => jumpToChapter(idx)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#0E1B2F] text-white shadow-md font-semibold'
                          : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span className={`text-xs font-mono ${isActive ? 'text-[#14B8A6] font-bold' : 'text-slate-400'}`}>
                          {cap.capitulo}
                        </span>
                        <span className="text-xs font-sans truncate">
                          {cap.titulo.split('&')[0].trim()}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cap.riesgoGtc45.clasificacion}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Acceso Rápido al Plano */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href="/plano"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-[#1A56DB] hover:text-white text-[#0E1B2F] font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 group"
                >
                  <Layers className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>Explorar Plano CAD Completo</span>
                </Link>
              </div>
            </div>

            {/* Tarjeta de Telemetría Rápida de la Zona Actual */}
            <div className="bg-[#0B132B] text-white border border-[#1E293B] rounded-2xl p-4 shadow-sm font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase">Zona CAD Vinculada:</span>
                <span className="text-[#34D399] font-bold">{currentCap.areaTecnica}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase">Nivel GTC 45:</span>
                <span 
                  className="font-bold px-1.5 py-0.5 rounded text-[10px]"
                  style={{ 
                    backgroundColor: `${currentCap.riesgoGtc45.colorNivel}20`,
                    color: currentCap.riesgoGtc45.colorNivel 
                  }}
                >
                  {currentCap.riesgoGtc45.nivel}
                </span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Los 5 Capítulos en Secuencia de Scrollytelling */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-20">
            {CAPITULOS_TOUR.map((cap, index) => {
              const isSelected = activeChapterIndex === index;

              return (
                <div
                  key={cap.id}
                  ref={(el) => { chapterRefs.current[index] = el; }}
                  className={`bg-white border rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden shadow-sm ${
                    isSelected 
                      ? 'border-[#1A56DB]/50 ring-2 ring-[#1A56DB]/10 shadow-lg' 
                      : 'border-[#64748B]/20 hover:border-[#64748B]/40'
                  }`}
                >
                  {/* Etiqueta del capítulo y tag normativo */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-[#0E1B2F] text-[#2DD4BF]">
                        CAPÍTULO {cap.capitulo}
                      </span>
                      <span className="text-xs font-mono text-[#64748B] font-semibold">
                        {cap.tag}
                      </span>
                    </div>

                    <span 
                      className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${cap.riesgoGtc45.colorNivel}15`, 
                        color: cap.riesgoGtc45.colorNivel 
                      }}
                    >
                      Peligro {cap.riesgoGtc45.clasificacion} // {cap.riesgoGtc45.nivel}
                    </span>
                  </div>

                  {/* Título y resumen del capítulo */}
                  <div className="mt-5 space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-[#0E1B2F] tracking-tight">
                      {cap.titulo}
                    </h3>
                    <p className="text-sm sm:text-base text-[#64748B] font-sans leading-relaxed">
                      {cap.subtitulo}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{cap.resumenVisual}"
                    </p>
                  </div>

                  {/* Selector de Pilares (Tabs limpios dentro de la tarjeta) */}
                  <div className="mt-6 pt-2">
                    <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs font-mono">
                      <button
                        onClick={() => setActiveTab('riesgo')}
                        className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center space-x-1.5 ${
                          activeTab === 'riesgo'
                            ? 'bg-[#0E1B2F] text-white'
                            : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>1. Riesgo GTC 45</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('norma')}
                        className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center space-x-1.5 ${
                          activeTab === 'norma'
                            ? 'bg-[#0E1B2F] text-white'
                            : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>2. Regla de Oro</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('epp')}
                        className={`px-3 py-1.5 rounded-lg transition-colors font-bold flex items-center space-x-1.5 ${
                          activeTab === 'epp'
                            ? 'bg-[#0E1B2F] text-white'
                            : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
                        }`}
                      >
                        <HardHat className="w-3.5 h-3.5 text-teal-400" />
                        <span>3. EPP & Controles</span>
                      </button>
                    </div>

                    {/* Contenido Dinámico según la Pestaña Activa */}
                    <div className="mt-4 min-h-[170px]">
                      
                      {/* Pestaña 1: RIESGO GTC 45 */}
                      {activeTab === 'riesgo' && (
                        <div className="space-y-3 animate-fade-in text-xs sm:text-sm font-sans">
                          <p className="text-[#0E1B2F] font-medium leading-relaxed">
                            <strong className="text-slate-900 font-bold">Identificación del Peligro:</strong> {cap.riesgoGtc45.descripcion}
                          </p>
                          <div className="mt-3">
                            <span className="text-xs font-mono text-slate-500 font-semibold block mb-2 uppercase">
                              Medidas de Control Existentes:
                            </span>
                            <ul className="space-y-1.5">
                              {cap.riesgoGtc45.medidasExistentes.map((medida, mIdx) => (
                                <li key={mIdx} className="flex items-start space-x-2 text-slate-700">
                                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                                  <span>{medida}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Pestaña 2: NORMA OBLIGATORIA (QUÉ HACER / QUÉ EVITAR) */}
                      {activeTab === 'norma' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in text-xs sm:text-sm">
                          {/* Qué hacer */}
                          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5">
                            <span className="text-xs font-mono font-bold text-emerald-800 flex items-center space-x-1.5 mb-2 uppercase">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Conducta Obligatoria</span>
                            </span>
                            <ul className="space-y-2 text-emerald-950 font-sans">
                              {cap.normaObligatoria.hacer.map((item, hIdx) => (
                                <li key={hIdx} className="flex items-start space-x-2">
                                  <span className="text-emerald-500 font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Qué evitar */}
                          <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-3.5">
                            <span className="text-xs font-mono font-bold text-red-800 flex items-center space-x-1.5 mb-2 uppercase">
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span>Prohibido / Riesgo Crítico</span>
                            </span>
                            <ul className="space-y-2 text-red-950 font-sans">
                              {cap.normaObligatoria.evitar.map((item, eIdx) => (
                                <li key={eIdx} className="flex items-start space-x-2">
                                  <span className="text-red-500 font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Pestaña 3: EPP REQUERIDO */}
                      {activeTab === 'epp' && (
                        <div className="space-y-3 animate-fade-in">
                          <span className="text-xs font-mono text-slate-500 font-semibold block uppercase">
                            Elementos de Protección Personal Certificados:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {cap.eppRequerido.map((epp, eIdx) => (
                              <div 
                                key={eIdx}
                                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                              >
                                <div className="flex items-center space-x-2">
                                  <HardHat className="w-4 h-4 text-[#0B7A87]" />
                                  <span className="font-semibold text-slate-800">{epp.nombre}</span>
                                </div>
                                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  epp.obligatorio ? 'bg-blue-100 text-[#1A56DB]' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {epp.obligatorio ? 'OBLIGATORIO' : 'RECOMENDADO'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Barra de Acción Rápida al pie del capítulo */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs font-mono text-[#64748B]">
                      <span>Área: <strong className="text-[#0E1B2F]">{cap.areaTecnica}</strong></span>
                    </div>

                    <Link
                      href={cap.accionRapida.href || `/plano?focus=${cap.id}`}
                      className="px-4 py-2 rounded-xl bg-[#1A56DB] hover:bg-blue-700 active:scale-95 text-white font-mono text-xs font-bold transition-all flex items-center space-x-2 shadow-xs group cursor-pointer"
                    >
                      <span>{cap.accionRapida.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
