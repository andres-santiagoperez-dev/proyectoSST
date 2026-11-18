# SafePulse SST — Suite Web Integral de Seguridad y Salud en el Trabajo (Colombia)

Suite de tres aplicativos web independientes, construida para empresas colombianas que gestionan su Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST) bajo el ciclo PHVA, integrando diseño visual de alto impacto, ergonomía preventiva con alarmas programadas y rigor normativo estricto.

---

## 🏗️ Arquitectura de la Suite (3 Aplicativos Independientes)

El proyecto está estructurado como un monorepo con **npm workspaces**, donde cada aplicativo es un proyecto Next.js 14 independiente con su propio puerto, dependencias, ciclo de compilación y dirección visual especializada:

```
proyectoSST/
├── apps/
│   ├── portal-empresa/       # [Puerto 3010] Portal Público Institucional (Dirección 3: Blueprint Isométrico)
│   ├── pausas-vitales/       # [Puerto 3015] Aplicativo de Pausas Activas y Ergonomía (Dirección 2: Ergonomía Vital)
│   └── admin-sgsst/          # [Puerto 3012] Consola del Administrador y Dashboard (Dirección 1: Demarcación Andon)
├── docs/
│   ├── adr/                  # Decisiones de arquitectura de software (Stack, Modelo de datos)
│   ├── diseno/               # Direcciones creativas, tokens CSS y especificación de movimiento
│   ├── requerimientos/       # Visión, actores, épicas, HU-001 a HU-006, RNF y trazabilidad normativa
│   └── PROGRESO.md           # Registro vivo del avance del proyecto
├── package.json              # Orquestador monorepo (scripts globales dev/start/build)
└── README.md
```

---

## 🎨 Las Tres Direcciones Visuales

| Aplicativo | Puerto | Enfoque & Rol | Dirección Visual & Estética | Momento Animado Memorable |
| :--- | :---: | :--- | :--- | :--- |
| **`portal-empresa`** | `3010` | **Público / Institucional**<br>Visitantes, clientes, colaboradores y comunidad | **Dirección 3: Blueprint Cartográfico Isométrico**<br>Azul técnico y cian cianuro (`#00E5FF`, `#002244`). Tono de plano de ingeniería, cuadrícula milimétrica, rigor topográfico. | **Plano Arquitectónico Isométrico Interactivo**: conmutación fluida entre capas de rutas de evacuación, puntos de pausa activa y extintores con tarjetas de inspección. |
| **`pausas-vitales`** | `3015` | **Trabajadores / Campo y Oficina**<br>Operarios y administrativos durante su jornada | **Dirección 2: Ergonomía Vital / El Pulso Humano**<br>Verde clínico-respiratorio (`#0D7377`), terracota cinético (`#F48C42`) y azul medianoche (`#14213D`). | **Orbe Biomecánico de Respiración Cuadrada (4-4-4)**: expansión y contracción orgánica para reducir cortisol, temporizador circular y campana acústica armónica (Web Audio API). |
| **`admin-sgsst`** | `3012` | **Líder SST / Administrador / Auditor**<br>Gerencia, Responsable de SST, ARL y MinTrabajo | **Dirección 1: Demarcación Industrial / Tablero Andon**<br>Amarillo preventivo tráfico (`#F59E0B`), gris asfalto (`#111827`) y bandas de seguridad en franjas diagonales. | **Marcador Andon de Telemetría**: semáforo interactivo ponderado de Estándares Mínimos (Res. 0312/2019) y reporte ágil de incidentes en campo (&lt; 60 seg, offline-first). |

---

## ⚖️ Marco Normativo Colombiano Verificado

El sistema no formula promesas genéricas como *"cumple con la ley"*, sino que enlaza cada campo y función a requisitos normativos verificados:

1. **Resolución 1843 de abril de 2025 (Ministerio del Trabajo):**
   - *Derogó expresamente la Resolución 2346 de 2007.*
   - Regula las evaluaciones médicas ocupacionales en Colombia (7 tipos de exámenes).
   - **Privacidad estricta implementada en `admin-sgsst`**: El empleador **solo tiene acceso y custodia del certificado de aptitud laboral** (*Apto, Apto con restricciones, No apto*) y recomendaciones de ergonomía. **Está técnicamente prohibido almacenar la historia clínica o diagnósticos médicos (CIE-10)** para salvaguardar el secreto profesional médico.
2. **Resolución 0312 de 2019 (Estándares Mínimos del SG-SST):**
   - Autoevaluación interactiva ponderada por ciclo PHVA: Planear (25%), Hacer (60%), Verificar (5%), Actuar (10%).
   - Clasificación dinámica de resultados: Crítico (&lt;60%), Moderadamente Aceptable (60% - 85%), Aceptable (&gt;85%).
3. **Resolución 1401 de 2007 (Investigación de Incidentes y Accidentes de Trabajo):**
   - Plazo perentorio de 15 días calendario para conformación de equipo investigador (Jefe de área, vigía/COPASST y responsable SST). Reporte formal ante ARL/EPS en máximo 2 días hábiles.
4. **Ley 1355 de 2009 (Pausas Activas y Promoción de Estilos de Vida Saludables):**
   - Fundamento legal del aplicativo `pausas-vitales`: pausas ergonómicas sistemáticas en jornadas laborales prolongadas.
5. **Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6):**
   - Decreto Único Reglamentario del Sector Trabajo que estructura todo el SG-SST.

---

## 🚀 Puesta en Marcha Rápida

### Requisitos Previos
- **Node.js** v18.17 o superior (recomendado v20 LTS).
- **npm** v9 o superior (soporte de workspaces).

### 1. Instalación de Dependencias
Desde la raíz del proyecto:
```bash
npm install
```

### 2. Ejecución en Modo Desarrollo

Puedes ejecutar cada aplicativo de manera individual según tu necesidad:

```bash
# 1. Portal Público Corporativo (Puerto 3010)
npm run dev:portal

# 2. Aplicativo de Pausas Activas y Ergonomía (Puerto 3015)
npm run dev:pausas

# 3. Consola Administrativa y Dashboard Andon (Puerto 3012)
npm run dev:admin
```

O iniciar sus versiones compiladas de producción:
```bash
# Iniciar los servidores en paralelo
npm run start:portal   # http://localhost:3010
npm run start:pausas   # http://localhost:3015
npm run start:admin    # http://localhost:3012
```

### 3. Compilación de Producción de Toda la Suite
Compila los 3 proyectos simultáneamente:
```bash
npm run build
```

---

## 🔒 Privacidad de Datos y Auditoría Inmutable

- **Datos de Ejemplo:** Toda la información cargada por defecto en los tableros, nóminas, trabajadores y accidentes está expresamente catalogada y señalizada como *"Dato de ejemplo / Ficticio"*. Nunca se procesan datos reales sin consentimiento.
- **Log de Auditoría Inmutable:** Cada aplicativo implementa un logger criptográfico local que encadena cada acción con hash SHA-256 (`src/lib/audit.ts`), garantizando no repudio ante inspecciones del Ministerio del Trabajo o la ARL.
- **Offline-First:** El módulo de reporte de incidentes en campo de `admin-sgsst` almacena reportes localmente en `localStorage` / `IndexedDB` si el supervisor pierde conectividad en bodega o mina, sincronizándose asincrónicamente al recuperar señal.

---

## ♿ Accesibilidad y Rendimiento

- **WCAG 2.2 Nivel AA:** Contraste reforzado en paletas de seguridad, redundancia de texto e iconos (no basarse únicamente en el color para alertas).
- **Respeto a `prefers-reduced-motion`:** Las animaciones con GSAP y CSS detectan las preferencias del sistema operativo del usuario, deshabilitando oscilaciones continuas y manteniendo transiciones instantáneas y accesibles.
- **Web Audio API amigable:** La alarma sonora de pausas activas utiliza tonos sinusoidales y frecuencias pentatónicas relajantes (440Hz / 660Hz / 880Hz), evitando timbres estridentes que generen sobresaltos auditivos.
