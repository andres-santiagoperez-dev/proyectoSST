import type { Metadata } from 'next';
import './globals.css';
import PausasNavbar from '@/components/PausasNavbar';

export const metadata: Metadata = {
  title: 'Pausa Vital — Ergonomía y Pausas Activas SG-SST',
  description: 'Aplicativo ergonómico de pausas activas con muñeco biomecánico en bucle, orbe diafragmático 4-7-8 y mapa anatómico interactivo. Conforme a Ley 1355 de 2009.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0E1B2F] selection:bg-[#10B981] selection:text-white">
        <PausasNavbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="py-6 border-t border-[#64748B]/20 text-center text-xs text-[#64748B] font-mono bg-[#FFFFFF]">
          © 2026 SafePulse SST — Proyecto 2: Pausa Vital (Dirección 2: Ergonomía Vital / El Pulso Humano). Conforme a Ley 1355 de 2009 y Resolución 0312 de 2019.
        </footer>
      </body>
    </html>
  );
}
