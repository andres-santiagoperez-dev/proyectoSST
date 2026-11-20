# 🚀 Guía Maestra de Despliegue en Hostinger (Camino 2: Node.js Nativo en hPanel)
## SafePulse SST — Suite Multi-Aplicación para Colombia

Esta guía detalla el procedimiento exacto paso a paso para subir y desplegar las **3 aplicaciones independientes** del repositorio en sus respectivos **3 subdominios** dentro del panel de control **hPanel de Hostinger**.

---

## 🗺️ 1. Mapeo de Subdominios y Aplicaciones

| Subdominio | Aplicación en el Monorepo | Paquete Generado | Rol en la Suite |
| :--- | :--- | :--- | :--- |
| `portal.tudominio.com` | `apps/portal-empresa` | `deploy/hostinger/portal.zip` | Portal público institucional, cotizador, sedes y telemetría |
| `pausas.tudominio.com` | `apps/pausas-vitales` | `deploy/hostinger/pausas.zip` | App operativa para trabajadores: pausas activas, descansos y feedback |
| `admin.tudominio.com` | `apps/admin-sgsst` | `deploy/hostinger/admin.zip` | Panel de control SST: matriz de riesgos, COPASST, horarios y reportes |

---

## 📦 2. Cómo Generar los Paquetes en Local (Tu Computador)

Hemos integrado un script automatizado que compila en modo **`standalone` de Next.js**, extrae únicamente los módulos de ejecución necesarios y empaqueta cada aplicación en un archivo `.zip` ultraligero (~5 MB cada uno, sin basura ni dependencias de desarrollo pesadas).

### Para empaquetar las 3 aplicaciones a la vez:
```powershell
npm run package:hostinger
```

### O empaquetar una individual si solo cambiaste una:
```powershell
npm run package:portal    # Genera deploy/hostinger/portal.zip
npm run package:pausas    # Genera deploy/hostinger/pausas.zip
npm run package:admin     # Genera deploy/hostinger/admin.zip
```

Los archivos generados quedan ubicados en la carpeta:
```
proyectoSST/
└── deploy/
    └── hostinger/
        ├── portal.zip  (~5.1 MB)
        ├── pausas.zip  (~4.9 MB)
        └── admin.zip   (~4.9 MB)
```

Cada paquete contiene internamente:
* `server.js` (Servidor de producción listo para arrancar en la raíz)
* `package.json`
* `.env` (Variables de entorno con puertos y URLs base)
* `.next/` (Archivos compilados de servidor y assets estáticos en `.next/static`)
* `node_modules/` (Solo los módulos mínimos estrictamente requeridos)

---

## 🌐 3. Crear los 3 Subdominios en Hostinger hPanel

1. Inicia sesión en [Hostinger hPanel](https://hpanel.hostinger.com).
2. Ve a la sección **Sitios Web** (Websites) y haz clic en **Administrar** (Manage) junto a tu dominio principal.
3. En el buscador del menú izquierdo escribe **Subdominios** (Subdomains).
4. Crea los 3 subdominios uno por uno:
   * **Subdominio 1:**
     - Nombre: `portal`
     - Carpeta de documentos: `public_html/portal`
     - Clic en **Crear**.
   * **Subdominio 2:**
     - Nombre: `pausas`
     - Carpeta de documentos: `public_html/pausas`
     - Clic en **Crear**.
   * **Subdominio 3:**
     - Nombre: `admin`
     - Carpeta de documentos: `public_html/admin`
     - Clic en **Crear**.

---

## 📂 4. Subir y Descomprimir los Archivos (Administrador de Archivos)

1. En hPanel, ve a **Archivos** (Files) ➔ **Administrador de Archivos** (File Manager) ➔ **Archivos de tudominio.com**.
2. Desplázate a la carpeta `public_html/`:

### Para el Portal:
* Entra en la carpeta `public_html/portal/`.
* Haz clic en el botón superior **Subir** (Upload) ➔ selecciona `deploy/hostinger/portal.zip` de tu computador.
* Una vez subido, haz clic derecho sobre `portal.zip` ➔ selecciona **Extraer** (Extract).
* Asegúrate de que se extraiga directamente dentro de `public_html/portal/`.
* *(Opcional)* Elimina el archivo `portal.zip` para ahorrar espacio.

### Para Pausas Vitales:
* Entra en `public_html/pausas/`.
* Clic en **Subir** ➔ selecciona `deploy/hostinger/pausas.zip`.
* Clic derecho sobre `pausas.zip` ➔ **Extraer**.
* Elimina el archivo `pausas.zip`.

### Para Admin SG-SST:
* Entra en `public_html/admin/`.
* Clic en **Subir** ➔ selecciona `deploy/hostinger/admin.zip`.
* Clic derecho sobre `admin.zip` ➔ **Extraer**.
* Elimina el archivo `admin.zip`.

---

## ⚙️ 5. Configurar la Aplicación Node.js en hPanel

> [!NOTE]
> En los planes Cloud Hosting, Business o planes con soporte Node.js de Hostinger, hPanel incluye un administrador gráfico de aplicaciones Node.js impulsado por CloudLinux / Passenger.

1. En el menú de hPanel, busca y abre la sección **Node.js** (o **Administrador de Aplicaciones Node.js**).
2. Haz clic en **Crear Aplicación** (Create Application) para cada uno de los subdominios:

### Configuración 1: Portal Empresa
* **Versión de Node.js:** Selecciona `20.x` (LTS recomendada) o `18.x`.
* **Modo de aplicación:** `Production`
* **Directorio raíz (Application Root):** `public_html/portal`
* **URL de la aplicación (Application URL):** `portal.tudominio.com`
* **Archivo de inicio (Startup File):** `server.js`
* **Variables de entorno (Environment Variables):**
  * `NODE_ENV` = `production`
  * `NEXT_PUBLIC_ADMIN_API_URL` = `https://admin.tudominio.com`
  * `NEXT_PUBLIC_PAUSAS_URL` = `https://pausas.tudominio.com`
* Haz clic en **Crear** (Create) o **Iniciar**.

### Configuración 2: Pausas Vitales
* **Versión de Node.js:** `20.x`
* **Modo de aplicación:** `Production`
* **Directorio raíz (Application Root):** `public_html/pausas`
* **URL de la aplicación (Application URL):** `pausas.tudominio.com`
* **Archivo de inicio (Startup File):** `server.js`
* **Variables de entorno (Environment Variables):**
  * `NODE_ENV` = `production`
  * `NEXT_PUBLIC_ADMIN_API_URL` = `https://admin.tudominio.com`
  * `NEXT_PUBLIC_PORTAL_URL` = `https://portal.tudominio.com`
* Haz clic en **Crear**.

### Configuración 3: Admin SG-SST
* **Versión de Node.js:** `20.x`
* **Modo de aplicación:** `Production`
* **Directorio raíz (Application Root):** `public_html/admin`
* **URL de la aplicación (Application URL):** `admin.tudominio.com`
* **Archivo de inicio (Startup File):** `server.js`
* **Variables de entorno (Environment Variables):**
  * `NODE_ENV` = `production`
  * `NEXT_PUBLIC_PORTAL_URL` = `https://portal.tudominio.com`
  * `NEXT_PUBLIC_PAUSAS_URL` = `https://pausas.tudominio.com`
* Haz clic en **Crear**.

---

## 🔒 6. Activar Certificados SSL (HTTPS)

1. En hPanel, ve a **Seguridad** ➔ **SSL**.
2. Verifica que los subdominios `portal`, `pausas` y `admin` tengan el certificado Let's Encrypt SSL activo.
3. Si alguno aparece como pendiente, haz clic en **Instalar SSL**.
4. Activa la opción **Forzar HTTPS** para garantizar conexiones cifradas en toda la suite.

---

## 🖥️ 7. Alternativa para Hostinger VPS (Virtual Private Server)

Si en lugar de Hosting Compartido/Cloud contrataste un **VPS de Hostinger** (con acceso SSH a Ubuntu/Debian), el despliegue es aún más directo usando PM2:

1. Conéctate a tu VPS por SSH:
   ```bash
   ssh root@ip_de_tu_vps
   ```
2. Asegúrate de tener Node.js 20 y PM2 instalados:
   ```bash
   node -v
   npm install -g pm2
   ```
3. Sube las carpetas `portal`, `pausas` y `admin` a `/var/www/`:
   ```bash
   /var/www/portal
   /var/www/pausas
   /var/www/admin
   ```
4. Arranca cada aplicación con PM2 en sus respectivos puertos:
   ```bash
   # Portal Empresa (Puerto 3020)
   cd /var/www/portal && PORT=3020 pm2 start server.js --name "safepulse-portal"

   # Pausas Vitales (Puerto 3021)
   cd /var/www/pausas && PORT=3021 pm2 start server.js --name "safepulse-pausas"

   # Admin SG-SST (Puerto 3022)
   cd /var/www/admin && PORT=3022 pm2 start server.js --name "safepulse-admin"

   # Guardar procesos para que arranquen con el sistema
   pm2 save
   pm2 startup
   ```
5. Configura Nginx como proxy inverso para direccionar cada subdominio a su respectivo puerto local (`3020`, `3021`, `3022`).

---

## 🔄 8. Flujo de Trabajo para Actualizaciones Futuras

Cada vez que realices cambios en el código de cualquiera de los portales:

1. En tu máquina local, ejecuta:
   ```powershell
   npm run package:hostinger
   ```
2. Sube el `.zip` actualizado al directorio correspondiente en Hostinger File Manager y dale **Extraer**.
3. En el Administrador Node.js de hPanel, haz clic en el botón **Reiniciar** (Restart App) de la aplicación actualizada.
4. Los cambios quedarán inmediatamente en producción sin tiempo de inactividad visible.
