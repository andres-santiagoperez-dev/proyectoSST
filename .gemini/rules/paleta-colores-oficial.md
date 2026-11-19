# Paleta Oficial Unificada de Colores // Suite SST

Este archivo es una regla de observancia obligatoria para cualquier agente o desarrollador que modifique o cree interfaces en cualquiera de los proyectos de la suite (`portal-empresa`, `pausas-vitales`, `admin-sgsst`).

---

## 1. Colores de Identidad y Navegación (Primarios)
- **Azul Marino Oscuro (`#0E1B2F`)**: Sidebar de navegación, encabezados `h1`, `h2`, títulos de alta jerarquía. Transmite seriedad, estructura y autoridad corporativa.
- **Azul Corporativo (`#1A56DB`)**: Color de acción principal para botones primarios destacados (`CTA`), enlaces clave e indicadores activos.
- **Agua Marina Oscuro (`#0B7A87`)**: Tono complementario para botones secundarios, badges de área y alertas informativas armónicas.

## 2. Colores de Enfoque y Énfasis (Agua Marina y Celestes)
- **Turquesa / Agua Marina (`#14B8A6`)**: Usado para dar vida y dinamismo a controles, interruptores, toggles de configuración y bordes activos.
- **Turquesa Claro (`#2DD4BF`)**: Relieves, ilustraciones técnicas de planos, trazados SVG y gráficos circulares.

## 3. Colores de Bienestar (Verdes)
- **Verde Esmeralda (`#10B981`)**: Representa salud, éxito, confirmaciones y la actividad de la "Pausa Activa".
- **Verde Menta (`#34D399`)**: Para elementos de logro, gradientes de respiración, sliders y switches "on/off" de bienestar.
- **Verde Bosque (`#047857`)**: Verde maduro ideal para la visualización de datos positivos, Punto de Encuentro PE-01 y estadísticas.

## 4. Estados de Trabajadores (Monitoreo de PCs en Admin)
- **Azul Enérgico (`#2563EB`)**: "Estado: Activo" (empleado laborando en su PC).
- **Verde Esmeralda (`#10B981`)**: "Estado: En Pausa" (cumpliendo con su sesión de pausa activa).
- **Agua Marina (`#06B6D4`)**: "Estado: Próxima Pausa" (aviso cercano de pausa en menos de 5 min).
- **Azul Grisáceo Oscuro (`#1E293B`)**: "Estado: Omitida" (tono neutro que comunica que no se realizó la pausa sin generar fricción punitiva).

## 5. Neutros y Fondos
- **Blanco Puro (`#FFFFFF`)**: Para tarjetas (`cards`), contenedores de paneles, diálogos, hojas y popups de alerta.
- **Azul Grisáceo Claro (`#F8FAFC`)**: El fondo (`canvas`) general de toda la aplicación, ideal para reducir la fatiga visual prolongada.
- **Gris Azulado (`#64748B`)**: Para bordes de componentes (`border-[#64748B]/20`), líneas divisorias y textos secundarios o metadata.

---

## Restricciones Inviolables
1. **NO usar fondos oscuros generales**: El fondo de la aplicación es `#F8FAFC`, las tarjetas son `#FFFFFF`. Solo los visores técnicos (como el plano de ingeniería) o el sidebar pueden usar `#0E1B2F`.
2. **NO inventar tonos amarillos, naranjas ni terracotas**: Reemplazados por la gama de bienestar verde/turquesa y azul corporativo.
3. **NO usar negros puros (`#000000`)**: Todo texto oscuro usa `#0E1B2F` o `#1E293B`.
4. **Respetar nombres de clases Tailwind**: Consumir las variables `brand-*`, `accent-*`, `vital-*`, `status-*` y `surface-*`.
