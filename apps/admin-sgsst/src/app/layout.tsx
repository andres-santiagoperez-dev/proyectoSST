import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import AdminNavbar from '@/components/AdminNavbar';

export const metadata: Metadata = {
  title: 'Consola Andon SG-SST — Industrias Andinas del Café',
  description: 'Aplicativo de gestión administrativa, telemetría Andon, autoevaluación Res. 0312, gestión de eventos y salud ocupacional Res. 1843/2025.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <body className="min-h-screen flex flex-col bg-industrial-concrete text-slate-900 selection:bg-amber-400 selection:text-slate-950">
        <AuthProvider>
          <AdminNavbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <footer className="py-6 border-t border-slate-300 text-center text-xs text-slate-500 font-mono bg-slate-100">
            © 2026 SafePulse SST — Proyecto 3: Consola Andon del Administrador (Dirección 1: Demarcación Industrial). Registro de Auditoría Inmutable Activo.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
