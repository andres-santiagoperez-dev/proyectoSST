import type { Metadata } from 'next';
import './globals.css';
import PortalNavbar from '@/components/PortalNavbar';
import PortalFooter from '@/components/PortalFooter';
import CustomCursor from '@/components/CustomCursor';
import AtmosphericBackground from '@/components/AtmosphericBackground';
import AudioAmbientToggle from '@/components/AudioAmbientToggle';

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
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0E1B2F] selection:bg-[#1A56DB] selection:text-white relative">
        {/* Fondo atmosférico inmersivo (luces suaves y partículas flotantes) */}
        <AtmosphericBackground />

        {/* Cursor reactivo personalizado con física inercial */}
        <CustomCursor />

        {/* Barra de navegación institucional fija */}
        <PortalNavbar />

        {/* Contenido principal de la vista */}
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>

        {/* Control de sonido ambiental en esquina inferior izquierda */}
        <AudioAmbientToggle />

        {/* Footer institucional */}
        <PortalFooter />
      </body>
    </html>
  );
}
