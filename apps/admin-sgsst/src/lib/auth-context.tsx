'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Rol, Usuario } from '@/types';
import { USUARIOS_DEMO } from './data-mock';
import { registrarAuditoria } from './audit';

interface AuthContextType {
  usuarioActual: Usuario | null;
  rolActivo: Rol;
  esVisitante: boolean;
  esColaborador: boolean;
  esLiderSST: boolean;
  esGerencia: boolean;
  esCOPASST: boolean;
  cambiarRol: (nuevoRol: Rol) => void;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'safepulse_active_role_v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [rolActivo, setRolActivo] = useState<Rol>('VISITANTE');
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);

  useEffect(() => {
    // Restaurar rol previo si existe
    const saved = localStorage.getItem(AUTH_STORAGE_KEY) as Rol | null;
    if (saved && ['VISITANTE', 'COLABORADOR', 'LIDER_SST', 'GERENCIA', 'COPASST'].includes(saved)) {
      cambiarRolInterno(saved, false);
    }
  }, []);

  const cambiarRolInterno = (nuevoRol: Rol, guardar = true) => {
    setRolActivo(nuevoRol);
    if (guardar && typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, nuevoRol);
    }

    if (nuevoRol === 'VISITANTE') {
      setUsuarioActual(null);
    } else {
      const match = USUARIOS_DEMO.find((u) => u.rol === nuevoRol);
      if (match) {
        setUsuarioActual(match);
        registrarAuditoria(
          match.email,
          nuevoRol,
          'CAMBIAR_ESTADO',
          'SesionUsuario',
          match.id,
          `Cambio de perfil activo a: ${nuevoRol} (${match.nombre})`
        );
      }
    }
  };

  const cambiarRol = (nuevoRol: Rol) => {
    cambiarRolInterno(nuevoRol, true);
  };

  const cerrarSesion = () => {
    cambiarRol('VISITANTE');
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        rolActivo,
        esVisitante: rolActivo === 'VISITANTE',
        esColaborador: rolActivo === 'COLABORADOR',
        esLiderSST: rolActivo === 'LIDER_SST',
        esGerencia: rolActivo === 'GERENCIA',
        esCOPASST: rolActivo === 'COPASST',
        cambiarRol,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
