'use client';

import React, { useState } from 'react';
import AdminSidebar, { TabAdmin } from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import ControlBienestarDashboard from '@/components/ControlBienestarDashboard';
import EmpleadosView from '@/components/EmpleadosView';
import AlertasConfigView from '@/components/AlertasConfigView';
import BibliotecaView from '@/components/BibliotecaView';
import ReportesHistorialView from '@/components/ReportesHistorialView';

export default function AdminPage() {
  const [tabActiva, setTabActiva] = useState<TabAdmin>('DASHBOARD');

  const titulosPorTab: Record<TabAdmin, string> = {
    DASHBOARD: 'Control de Bienestar',
    EMPLEADOS: 'Directorio de Empleados y Puestos',
    ALERTAS: 'Configuración de Alertas en Red',
    BIBLIOTECA: 'Biblioteca de Ejercicios',
    REPORTES: 'Reportes, Estándares 0312 y Auditoría',
  };

  return (
    <div className="min-h-screen flex bg-surface-bg text-brand-navy font-sans antialiased">
      {/* 1. SIDEBAR IZQUIERDO (Azul Marino Oscuro #0E1B2F) */}
      <AdminSidebar
        tabActiva={tabActiva}
        onCambiarTab={(tab) => setTabActiva(tab)}
      />

      {/* 2. ÁREA PRINCIPAL DERECHA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Encabezado Superior con Título Dinámico y Perfil */}
        <AdminHeader titulo={titulosPorTab[tabActiva]} />

        {/* Contenido Principal */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {tabActiva === 'DASHBOARD' && <ControlBienestarDashboard />}
          {tabActiva === 'EMPLEADOS' && <EmpleadosView />}
          {tabActiva === 'ALERTAS' && <AlertasConfigView />}
          {tabActiva === 'BIBLIOTECA' && <BibliotecaView />}
          {tabActiva === 'REPORTES' && <ReportesHistorialView />}
        </main>

        {/* Footer Discreto */}
        <footer className="py-4 px-8 border-t border-slate-200/80 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 bg-white/50">
          <span>PausaActiva / SafePulse SST • Sistema de Monitoreo de PCs y Estándares de Bienestar</span>
          <span>Resolución 0312/2019 • Resolución 1843/2025 • Ley 1355/2009</span>
        </footer>
      </div>
    </div>
  );
}
