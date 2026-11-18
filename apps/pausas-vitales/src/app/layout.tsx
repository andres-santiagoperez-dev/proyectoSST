import type { Metadata } from 'next';
import './globals.css';
import PausasNavbar from '@/components/PausasNavbar';

export const metadata: Metadata = {
  title: 'Pausa Vital — Ergonomía y Alarmas Activas SG-SST',
  description: 'Aplicativo independiente de ergonomía y pausas activas con orbe biomecánico de respiración y alarmas programables en segundo plano.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <body className="min-h-screen flex flex-col bg-vital-bg text-slate-800 selection:bg-emerald-200 selection:text-emerald-950">
        <PausasNavbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-400 font-mono">
          © 2026 SafePulse SST — Proyecto 2: Pausa Vital (Dirección 2: Ergonomía Vital / El Pulso Humano). Conforme a Ley 1355 de 2009.
        </footer>
      </body>
    </html>
  );
}
