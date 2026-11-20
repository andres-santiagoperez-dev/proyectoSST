'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  HardHat, 
  MapPin, 
  Layers, 
  Sparkles,
  FileText
} from 'lucide-react';
import { DIRECTORIO_NORMAS, NormaDirectorioItem } from '@/data/normas-sst';

export default function QuickNormsDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['Todos', 'Biomecánico', 'Eléctrico', 'Mecánico', 'Emergencias', 'Locativo', 'Químico'];

  const filteredNorms = useMemo(() => {
    return DIRECTORIO_NORMAS.filter((norma) => {
      const matchesCategory = selectedCategory === 'Todos' || norma.categoria === selectedCategory;
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        norma.titulo.toLowerCase().includes(term) ||
        norma.resumen.toLowerCase().includes(term) ||
        norma.reglaOro.toLowerCase().includes(term) ||
        norma.areaAfectada.toLowerCase().includes(term) ||
        norma.codigo.toLowerCase().includes(term) ||
        norma.epp.some(item => item.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="directorio-normas"
      className="py-12 sm:py-20 bg-white border-t border-[#64748B]/20 transition-colors"
      aria-label="Directorio Rápido de Normas y Protocolos SST"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Directorio */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1A56DB] font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Directorio Rápido // Consulta Inmediata</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-outfit text-[#0E1B2F] tracking-tight">
              Catálogo de Normas y Reglas de Oro
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md font-sans">
            Encuentra rápidamente la norma específica, el artículo de ley correspondiente (Decreto 1072 / Res. 0312) y las directrices de seguridad para cada labor.
          </p>
        </div>

        {/* Barra de Filtros y Búsqueda en Vivo */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Input de Búsqueda */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por norma, palabra clave (ej: LOTO, montacargas, extintor, EPP)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#0E1B2F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] transition-all font-sans"
            />
          </div>

          {/* Filtros por Categoría */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0E1B2F] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#64748B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#64748B]">
          <span>Mostrando {filteredNorms.length} de {DIRECTORIO_NORMAS.length} protocolos</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#1A56DB] hover:underline"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>

        {/* Cuadrícula de Tarjetas de Normas */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNorms.map((norma) => {
            const isExpanded = expandedId === norma.id;

            return (
              <div
                key={norma.id}
                className="bg-[#F8FAFC] border border-[#64748B]/20 rounded-2xl p-5 hover:border-[#1A56DB]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                    <span className="font-mono text-[11px] font-bold text-[#64748B]">
                      {norma.codigo}
                    </span>
                    <span 
                      className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${norma.colorCategoria}15`, 
                        color: norma.colorCategoria 
                      }}
                    >
                      {norma.categoria}
                    </span>
                  </div>

                  {/* Título y Marco Legal */}
                  <h3 className="mt-3 text-base sm:text-lg font-bold font-outfit text-[#0E1B2F] leading-snug">
                    {norma.titulo}
                  </h3>
                  <div className="mt-1 text-[11px] font-mono text-[#0B7A87] font-medium flex items-center space-x-1">
                    <FileText className="w-3 h-3 shrink-0" />
                    <span>{norma.normaLegal}</span>
                  </div>

                  {/* Resumen */}
                  <p className="mt-2.5 text-xs text-[#64748B] font-sans leading-relaxed">
                    {norma.resumen}
                  </p>

                  {/* Regla de Oro Destacada */}
                  <div className="mt-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs font-sans text-blue-950">
                    <strong className="text-[#1A56DB] font-mono block text-[10px] uppercase font-bold tracking-wider mb-1">
                      Regla de Oro Obligatoria:
                    </strong>
                    {norma.reglaOro}
                  </div>

                  {/* Detalles Expandibles */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5 animate-fade-in text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block mb-1">
                          EPP Requerido:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {norma.epp.map((e, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-sans text-[11px]"
                            >
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-slate-500 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#1A56DB] shrink-0" />
                        <span>Aplica en: <strong className="text-slate-800">{norma.areaAfectada}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botón de Expansión / Colapso */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(norma.id)}
                    className="text-xs font-mono text-[#1A56DB] hover:text-blue-700 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Menos detalles' : 'Ver EPP y detalles'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <Link
                    href="/plano"
                    className="text-[11px] font-mono text-slate-500 hover:text-[#0E1B2F] flex items-center space-x-1"
                    title="Ubicar en plano isométrico"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Ver en plano</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNorms.length === 0 && (
          <div className="mt-12 text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-3xl">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold font-mono text-slate-700">No se encontraron normas con esos filtros</h4>
            <p className="text-xs text-slate-500 mt-1">Prueba con palabras como "LOTO", "extintor", "gafas" o selecciona "Todos".</p>
          </div>
        )}

      </div>
    </section>
  );
}
