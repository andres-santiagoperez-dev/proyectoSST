import React from 'react';
import BreathingOrb from '@/components/BreathingOrb';
import AlarmScheduler from '@/components/AlarmScheduler';
import ErgonomicExercises from '@/components/ErgonomicExercises';
import { HeartPulse, Sparkles, ShieldCheck } from 'lucide-react';

export default function PausasPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
      {/* Banner de bienvenida y propósito de salud */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Proyecto 2 • Dirección 2: Ergonomía Vital / El Pulso Humano</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-vital-forest font-outfit tracking-tight">
          Tu cuerpo es el ritmo que <br />
          <span className="text-vital-terracotta">mueve nuestra empresa.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
          Las jornadas prolongadas frente a pantallas o en líneas de empaque fatigan músculos y ojos. Configura tu alarma periódica y realiza 3 minutos de pausa activa para renovar tu bienestar.
        </p>
      </div>

      {/* Cuadrícula superior: Orbe de Respiración + Programador de Alarmas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <BreathingOrb />
        </div>
        <div className="lg:col-span-5">
          <AlarmScheduler />
        </div>
      </div>

      {/* Catálogo de Ejercicios Ergonómicos Paso a Paso */}
      <ErgonomicExercises />
    </div>
  );
}
