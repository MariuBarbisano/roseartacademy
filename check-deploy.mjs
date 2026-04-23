#!/usr/bin/env node

/**
 * Script de verificación pre-deploy
 * Verifica que todo esté listo para producción
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checks = [];
let errors = 0;

function check(name, condition, errorMsg) {
  checks.push({ name, passed: condition });
  if (!condition) {
    console.error(`❌ ${name}: ${errorMsg}`);
    errors++;
  } else {
    console.log(`✅ ${name}`);
  }
}

console.log('\n🔍 Verificando proyecto para deploy...\n');

// Check Frontend
console.log('📦 FRONTEND');
check(
  'package.json existe',
  fs.existsSync(path.join(__dirname, 'Front', 'package.json')),
  'No se encontró Front/package.json'
);

check(
  '.env.example existe',
  fs.existsSync(path.join(__dirname, 'Front', '.env.example')),
  'Falta Front/.env.example'
);

check(
  'vercel.json existe',
  fs.existsSync(path.join(__dirname, 'Front', 'vercel.json')),
  'Falta Front/vercel.json'
);

check(
  'logo.jpeg existe',
  fs.existsSync(path.join(__dirname, 'Front', 'public', 'logo.jpeg')),
  'Falta Front/public/logo.jpeg'
);

// Check Backend
console.log('\n🔧 BACKEND');
check(
  'package.json existe',
  fs.existsSync(path.join(__dirname, 'Back', 'package.json')),
  'No se encontró Back/package.json'
);

check(
  '.env.example existe',
  fs.existsSync(path.join(__dirname, 'Back', '.env.example')),
  'Falta Back/.env.example'
);

check(
  'railway.json existe',
  fs.existsSync(path.join(__dirname, 'Back', 'railway.json')),
  'Falta Back/railway.json'
);

check(
  'schema.sql existe',
  fs.existsSync(path.join(__dirname, 'Back', 'database', 'schema.sql')),
  'Falta Back/database/schema.sql'
);

check(
  'migrate.js existe',
  fs.existsSync(path.join(__dirname, 'Back', 'database', 'migrate.js')),
  'Falta Back/database/migrate.js'
);

// Check Git
console.log('\n📚 GIT');
check(
  '.gitignore existe',
  fs.existsSync(path.join(__dirname, '.gitignore')),
  'Falta .gitignore en raíz'
);

check(
  'README existe',
  fs.existsSync(path.join(__dirname, 'README.md')),
  'Falta README.md (opcional pero recomendado)'
);

// Check Docs
console.log('\n📄 DOCUMENTACIÓN');
check(
  'DEPLOY.md existe',
  fs.existsSync(path.join(__dirname, 'DEPLOY.md')),
  'Falta DEPLOY.md con instrucciones'
);

check(
  'QUICK_START.md existe',
  fs.existsSync(path.join(__dirname, 'QUICK_START.md')),
  'Falta QUICK_START.md'
);

// Resumen
console.log('\n' + '='.repeat(50));
if (errors === 0) {
  console.log('✨ ¡TODO LISTO PARA DEPLOY! ✨');
  console.log('\nPróximos pasos:');
  console.log('1. git add .');
  console.log('2. git commit -m "Ready for production"');
  console.log('3. git push origin main');
  console.log('4. Seguir instrucciones en DEPLOY.md');
  process.exit(0);
} else {
  console.error(`\n⚠️  ${errors} error(es) encontrado(s)`);
  console.error('Por favor corregí los errores antes de deployar.');
  process.exit(1);
}
