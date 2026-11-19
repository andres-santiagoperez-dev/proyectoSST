import type { Metadata } from 'next';
import './globals.css';
import PortalNavbar from '@/components/PortalNavbar';
import PortalFooter from '@/components/PortalFooter';

export const metadata: Metadata = {
  title: 'Portal Corporativo SG-SST — Industrias Andinas del Café S.A.S.',
  description: 'Portal público institucional de Seguridad y Salud en el Trabajo para Colombia. Visualización de plano isométrico, rutas de evacuación, políticas y comités.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0E1B2F] selection:bg-[#1A56DB] selection:text-white">
        <PortalNavbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <PortalFooter />
      </body>
    </html>
  );
}
