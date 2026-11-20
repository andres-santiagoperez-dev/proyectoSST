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
    name: 'Portal Empresa',
    dir: path.join(rootDir, 'apps', 'portal-empresa'),
    distDir: path.join(rootDir, 'apps', 'portal-empresa', 'dist'),
    zipName: 'portal-dist.zip',
    tarName: 'portal-dist.tar.gz'
  },
  {
    id: 'pausas',
    name: 'Pausas Vitales',
    dir: path.join(rootDir, 'apps', 'pausas-vitales'),
    distDir: path.join(rootDir, 'apps', 'pausas-vitales', 'dist'),
    zipName: 'pausas-dist.zip',
    tarName: 'pausas-dist.tar.gz'
  },
  {
    id: 'admin',
    name: 'Admin SG-SST',
    dir: path.join(rootDir, 'apps', 'admin-sgsst'),
    distDir: path.join(rootDir, 'apps', 'admin-sgsst', 'dist'),
    zipName: 'admin-dist.zip',
    tarName: 'admin-dist.tar.gz'
  }
];

const outDir = path.join(rootDir, 'deploy', 'dist');
fs.mkdirSync(outDir, { recursive: true });

console.log('🚀 Iniciando compilación de carpetas dist para despliegue web...');

for (const app of APPS) {
  console.log(`\n📦 Compilando ${app.name} (${app.id})...`);
  execSync('npm run build', { cwd: app.dir, stdio: 'inherit' });

  const zipPath = path.join(outDir, app.zipName);
  const tarPath = path.join(outDir, app.tarName);

  if (fs.existsSync(zipPath)) fs.rmSync(zipPath, { force: true });
  if (fs.existsSync(tarPath)) fs.rmSync(tarPath, { force: true });

  execSync(`tar.exe -a -c -f "${zipPath}" -C "${app.distDir}" .`, { stdio: 'inherit' });
  execSync(`tar.exe -czf "${tarPath}" -C "${app.distDir}" .`, { stdio: 'inherit' });

  const zipKb = (fs.statSync(zipPath).size / 1024).toFixed(1);
  console.log(`✅ ${app.name} listo en deploy/dist/${app.zipName} (${zipKb} KB)`);
}

console.log('\n🎉 ¡Todas las carpetas dist han sido generadas y empaquetadas exitosamente en deploy/dist/!');
