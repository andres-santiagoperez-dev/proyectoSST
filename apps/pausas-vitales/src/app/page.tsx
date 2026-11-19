import React from 'react';
import BreathingOrb from '@/components/BreathingOrb';
import AlarmScheduler from '@/components/AlarmScheduler';
import ErgonomicExercises from '@/components/ErgonomicExercises';
import { Sparkles, HeartPulse, ShieldCheck, Activity } from 'lucide-react';

export default function PausasPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
      {/* Banner de bienvenida y propósito de bienestar ergonómico */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 text-[#0B7A87] border border-teal-200 text-xs font-mono font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Dirección 2: Ergonomía Vital / El Pulso Humano • Ley 1355/2009</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0E1B2F] font-outfit tracking-tight leading-tight">
          Tu cuerpo es el ritmo que <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#14B8A6] to-[#0B7A87]">
            mueve nuestra empresa.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mt-3 max-w-2xl mx-auto font-medium leading-relaxed">
          Las jornadas prolongadas frente a pantallas o en áreas operativas fatigan articulaciones y músculos. Programa tu alarma periódica, sincroniza tu respiración y realiza 3 minutos de pausa activa para cuidar tu salud.
        </p>
      </div>

      {/* Cuadrícula superior: Orbe de Respiración Diafragmática 4-7-8 + Motor de Alarmas Periódicas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7">
          <BreathingOrb />
        </div>
        <div className="lg:col-span-5">
          <AlarmScheduler />
        </div>
      </div>

      {/* Catálogo de Ejercicios Ergonómicos: Mapa Corporal + Muñeco Biomecánico + Rutinas */}
      <ErgonomicExercises />
    </div>
  );
}
