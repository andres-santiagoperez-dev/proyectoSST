# ADR 0001: Selección del Stack Tecnológico — React Full-Stack Asincrónico con Next.js y GSAP/Motion

**Estado:** Propuesto (Esperando aprobación en Punto de Control B)  
**Fecha:** 2026-11-18  
**Autor:** Equipo de Arquitectura SG-SST  
**Decisores:** Cliente / Desarrollador  

---

## 1. Contexto y Problema
Se requiere construir un aplicativo web integral de Seguridad y Salud en el Trabajo (SG-SST) para Colombia que resuelva dos desafíos complementarios:
1. **Frontend distintivo, animado y de alto impacto:** Portal público institucional de la empresa con momentos animados memorables (scroll storytelling), y un módulo interactivo de pausas activas ("Pausa Vital") con alarmas programables en segundo plano, temporizadores visuales y ejercicios ergonómicos animados.
2. **Aplicación robusta, asincrónica y resiliente:** Reporte ágil de incidentes en campo con soporte sin conexión (offline-first con sincronización asincrónica), tablero gerencial de estándares mínimos (Resolución 0312 de 2019) y gestión de aptitudes médicas bajo estricta confidencialidad (Resolución 1843 de 2025).

El cliente ha manifestado su preferencia por **React de forma asincrónica**.

---

## 2. Opciones Consideradas

### Opción 1: Next.js (App Router) + React TypeScript Asincrónico + Tailwind CSS + GSAP/Motion + Prisma/PostgreSQL-SQLite `[RECOMENDADA]`
* **Frontend:** React con arquitectura híbrida (Server Components para rendimiento inicial de datos y Client Components asíncronos para interactividad, animaciones y Web APIs).
* **Gestión Asincrónica:** Server Actions asíncronas (`async/await`) con transacciones ACID, Web Worker para el temporizador de pausas activas, y cola de sincronización asincrónica sobre `IndexedDB` para reportes sin conexión.
* **Animaciones:** GSAP 3 (GreenSock) para secuencias complejas y ScrollTrigger + Framer Motion / Motion para microinteracciones accesibles con soporte nativo de `prefers-reduced-motion`.
* **Backend y Datos:** Servidor Node.js integrado en Next.js, Prisma ORM con base de datos relacional (SQLite para desarrollo local y pruebas automatizadas instantáneas; compatible con PostgreSQL en producción sin cambios de código).
* **Compromisos:** Requiere dominar la frontera entre Server y Client Components en Next.js.

### Opción 2: Vite SPA (React + TypeScript) + API desacoplada en Node.js (Fastify / Express)
* **Frontend:** Single Page Application (SPA) en React con TanStack Query para fetching asíncrono y caché.
* **Backend:** Servidor API REST independiente con Fastify o Express.
* **Compromisos:** Desacople que obliga a gestionar dos proyectos, dos servidores en desarrollo (puertos distintos), configuración de CORS y despliegue por duplicado. Además, el SEO y renderizado inicial del portal institucional es más lento que con SSR.

### Opción 3: Remix / React Router v7 Full-Stack
* **Frontend/Backend:** Enfoque unificado con loaders y actions asíncronos basados en la API Fetch estándar.
* **Compromisos:** Ecosistema de plantillas y plugins de animación ligeramente más reducido que en Next.js.

---

## 3. Decisión Adoptada
Se adopta la **Opción 1: Next.js con React TypeScript Asincrónico**.

### Justificación:
1. **Atiende al 100 % la directriz del cliente ("React de forma asincrónica"):** Toda la comunicación cliente-servidor se gestiona mediante promesas y Server Actions asíncronas no bloqueantes.
2. **Capacidad de animación de máxima categoría:** Compatibilidad probada con GSAP y Motion para entregar el frontend vistoso, único y animado que el proyecto demanda.
3. **Resiliencia en campo (Offline-First):** Integración nativa con `IndexedDB` y Web Notifications en componentes cliente de React.
4. **Agilidad y simplicidad operativa:** Un solo repositorio, una sola suite de pruebas y base de datos relacional con tipado estricto de extremo a extremo mediante Prisma.

---

## 4. Consecuencias
* **Positivas:**
  * Desarrollo acelerado y cohesivo: tipos compartidos para normas SST, eventos y auditoría.
  * Tiempos de carga ultrarrápidos en el portal público (First Contentful Paint < 1.2 s).
  * Soporte offline real para los trabajadores en campo y bodegas sin red.
* **A considerar:**
  * Las animaciones pesadas de GSAP deben montarse en componentes con directiva `'use client'` y limpiar sus instancias en el desmontaje (`gsap.context()`) para evitar fugas de memoria.
