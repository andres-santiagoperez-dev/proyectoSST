import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const APPS = [
  {
    id: 'portal',
    name: 'Portal Empresa (SafePulse SST)',
    dirName: 'portal-empresa',
    srcDir: path.join(rootDir, 'apps', 'portal-empresa'),
    outDir: path.join(rootDir, 'deploy', 'hostinger', 'portal'),
    zipName: 'portal.zip',
    defaultPort: 3020,
    envVars: {
      NODE_ENV: 'production',
      PORT: '3020',
      NEXT_PUBLIC_ADMIN_API_URL: 'https://admin.tudominio.com',
      NEXT_PUBLIC_PAUSAS_URL: 'https://pausas.tudominio.com'
    }
  },
  {
    id: 'pausas',
    name: 'Pausas Vitales (SafePulse SST)',
    dirName: 'pausas-vitales',
    srcDir: path.join(rootDir, 'apps', 'pausas-vitales'),
    outDir: path.join(rootDir, 'deploy', 'hostinger', 'pausas'),
    zipName: 'pausas.zip',
    defaultPort: 3021,
    envVars: {
      NODE_ENV: 'production',
      PORT: '3021',
      NEXT_PUBLIC_ADMIN_API_URL: 'https://admin.tudominio.com',
      NEXT_PUBLIC_PORTAL_URL: 'https://portal.tudominio.com'
    }
  },
  {
    id: 'admin',
    name: 'Admin SG-SST (SafePulse SST)',
    dirName: 'admin-sgsst',
    srcDir: path.join(rootDir, 'apps', 'admin-sgsst'),
    outDir: path.join(rootDir, 'deploy', 'hostinger', 'admin'),
    zipName: 'admin.zip',
    defaultPort: 3022,
    envVars: {
      NODE_ENV: 'production',
      PORT: '3022',
      NEXT_PUBLIC_PORTAL_URL: 'https://portal.tudominio.com',
      NEXT_PUBLIC_PAUSAS_URL: 'https://pausas.tudominio.com'
    }
  }
];

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function packageApp(app, shouldBuild = false) {
  console.log(`\n==================================================`);
  console.log(`📦 Empaquetando: ${app.name} (${app.id})`);
  console.log(`==================================================`);

  const standaloneServer = path.join(app.srcDir, '.next', 'standalone', 'apps', app.dirName, 'server.js');
  const standaloneModules = path.join(app.srcDir, '.next', 'standalone', 'node_modules');
  const standaloneNext = path.join(app.srcDir, '.next', 'standalone', 'apps', app.dirName, '.next');
  const staticDir = path.join(app.srcDir, '.next', 'static');
  const publicDir = path.join(app.srcDir, 'public');
  const packageJson = path.join(app.srcDir, 'package.json');

  // Si no está compilado o se solicita forzar build
  const needsBuild = shouldBuild || !fs.existsSync(standaloneServer);
  if (needsBuild) {
    console.log(`🔨 Compilando producción con standalone en ${app.dirName}...`);
    execSync(`npm run build`, {
      cwd: app.srcDir,
      stdio: 'inherit'
    });
  }

  if (!fs.existsSync(standaloneServer)) {
    throw new Error(`❌ No se encontró ${standaloneServer}. Verifica que next.config.mjs tenga output: 'standalone'.`);
  }

  // Limpiar destino
  if (fs.existsSync(app.outDir)) {
    console.log(`🧹 Limpiando directorio de destino previo: ${app.outDir}`);
    fs.rmSync(app.outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(app.outDir, { recursive: true });

  // 1. Copiar server.js al nivel raíz del paquete para Hostinger hPanel
  console.log(`📄 Copiando server.js a la raíz del paquete...`);
  fs.copyFileSync(standaloneServer, path.join(app.outDir, 'server.js'));

  // 2. Copiar package.json
  if (fs.existsSync(packageJson)) {
    console.log(`📄 Copiando package.json...`);
    fs.copyFileSync(packageJson, path.join(app.outDir, 'package.json'));
  }

  // 3. Copiar node_modules trazados por standalone
  if (fs.existsSync(standaloneModules)) {
    console.log(`📁 Copiando dependencias trazadas (node_modules)...`);
    copyDirRecursive(standaloneModules, path.join(app.outDir, 'node_modules'));
  }

  // 4. Copiar .next servidor
  if (fs.existsSync(standaloneNext)) {
    console.log(`📁 Copiando bundle compilado de .next...`);
    copyDirRecursive(standaloneNext, path.join(app.outDir, '.next'));
  }

  // 5. Copiar .next/static (OBLIGATORIO en standalone para Next.js)
  if (fs.existsSync(staticDir)) {
    console.log(`📁 Copiando assets estáticos a .next/static...`);
    copyDirRecursive(staticDir, path.join(app.outDir, '.next', 'static'));
  }

  // 6. Copiar public si existe
  if (fs.existsSync(publicDir)) {
    console.log(`📁 Copiando carpeta public...`);
    copyDirRecursive(publicDir, path.join(app.outDir, 'public'));
  }

  // 7. Escribir archivo .env con variables de entorno para producción
  const envContent = Object.entries(app.envVars)
    .map(([key, val]) => `${key}=${val}`)
    .join('\n');
  fs.writeFileSync(path.join(app.outDir, '.env'), envContent + '\n', 'utf-8');
  fs.writeFileSync(path.join(app.outDir, '.env.example'), envContent + '\n', 'utf-8');
  console.log(`⚙️  Generado archivo .env con configuración base.`);

  // 8. Crear archivo .zip para subida directa en Hostinger File Manager
  const zipDest = path.join(rootDir, 'deploy', 'hostinger', app.zipName);
  if (fs.existsSync(zipDest)) {
    fs.rmSync(zipDest, { force: true });
  }

  console.log(`🗜️  Comprimiendo archivo listo para hPanel: ${app.zipName}...`);
  // Usamos PowerShell nativo en Windows
  const psZipCmd = `powershell -Command "Compress-Archive -Path '${app.outDir}\\*' -DestinationPath '${zipDest}' -Force"`;
  execSync(psZipCmd, { stdio: 'inherit' });

  const stats = fs.statSync(zipDest);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`✅ ¡Paquete completado!: ${zipDest} (${sizeMb} MB)`);
}

function main() {
  const args = process.argv.slice(2);
  const targetAppId = args.find(a => !a.startsWith('--'));
  const forceBuild = args.includes('--build');

  console.log(`🚀 Iniciando empaquetador SafePulse SST para Hostinger (Camino 2: Standalone)`);

  const appsToPackage = targetAppId 
    ? APPS.filter(a => a.id === targetAppId)
    : APPS;

  if (appsToPackage.length === 0) {
    console.error(`❌ Aplicación no encontrada: "${targetAppId}". Opciones válidas: portal, pausas, admin`);
    process.exit(1);
  }

  for (const app of appsToPackage) {
    packageApp(app, forceBuild);
  }

  console.log(`\n🎉 Todos los paquetes para Hostinger han sido generados exitosamente en deploy/hostinger/`);
}

main();
