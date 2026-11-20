import React from 'react';
import type { Metadata } from 'next';
import ImmersiveHero from '@/components/ImmersiveHero';
import ScrollytellingTour from '@/components/ScrollytellingTour';
import UnseenZoneShowcase from '@/components/UnseenZoneShowcase';
import QuickNormsDirectory from '@/components/QuickNormsDirectory';
import SummarySection from '@/components/SummarySection';
import UnseenButton from '@/components/UnseenButton';
import { Layers, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experiencia Interactiva SG-SST // SafePulse Innovatec',
  description: 'Portal interactivo inmersivo de Seguridad y Salud en el Trabajo: scrollytelling por zonas, normas GTC 45, simulador de evacuación con gemelo digital y galería de protocolos.',
};

export default function HomePage() {
  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16">
      
      {/* 1. Hero Inmersivo y Reactivo al Cursor (Estilo Unseen Studio) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <ImmersiveHero />
      </div>

      {/* 2. Galería de Zonas e Instalaciones (Píldoras de Filtro & Tarjetas Unseen) */}
      <UnseenZoneShowcase />

      {/* 3. Recorrido Scrollytelling Guiado por Capítulos (Lenis + GSAP/Observer) */}
      <ScrollytellingTour />

      {/* 4. Puente Interactivo al Visor CAD / Digital Twin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-theme="dark" className="relative rounded-3xl bg-[#0B132B] border border-[#1E293B] p-8 sm:p-12 overflow-hidden shadow-2xl text-white">
          {/* Fondo reticulado técnico CAD */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1E293B 1px, transparent 1px),
                linear-gradient(to bottom, #1E293B 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0E1726] border border-[#1E293B] text-[#34D399] font-mono text-xs">
                <Layers className="w-3.5 h-3.5" />
                <span>Consola CAD / Digital Twin 3D</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-outfit text-white tracking-tight">
                Explora el Plano Axonométrico con Simulación de Evacuación
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Visualiza el plano arquitectónico en corte 3D de la sede con capas de señalización, extintores Solkaflam/PQS y telemetría de evacuación con 4 muñecos humanoides en desplazamiento hacia el Punto de Encuentro PE-01.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-slate-400">
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Rutas Fotoluminiscentes NTC 1461</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5 text-cyan-400">
                  <Activity className="w-4 h-4" />
                  <span>4 Avatares en Evacuación Real</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <UnseenButton
                variant="emerald"
                arrow="right"
                href="/plano?simular=true"
                dataCursor="hover"
              >
                Simular Evacuación
              </UnseenButton>

              <UnseenButton
                variant="dark"
                arrow="up-right"
                href="/plano"
                dataCursor="hover"
              >
                Abrir Visor CAD
              </UnseenButton>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Directorio Rápido de Normas y Búsqueda en Vivo */}
      <QuickNormsDirectory />

      {/* 6. Telemetría Institucional y Cumplimiento Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SummarySection />
      </div>

    </div>
  );
}
