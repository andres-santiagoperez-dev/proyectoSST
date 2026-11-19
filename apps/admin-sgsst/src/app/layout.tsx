import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'Control de Bienestar — PausaActiva / SafePulse SST',
  description: 'Portal Administrativo de Control de Bienestar, Monitoreo de PCs en Tiempo Real, Alertas y Auditoría SG-SST.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <body className="min-h-screen bg-[#F8FAFC] text-[#0E1B2F] antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
