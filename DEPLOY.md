# 🚀 Guía de Deploy - Rose Fine Arts Academy

## ✅ Checklist Pre-Deploy

### 1. Frontend (React + Vite)
- [x] Todas las rutas funcionan correctamente
- [x] Variables de entorno configuradas (.env.example)
- [x] Build script configurado en package.json
- [x] Vercel.json creado para SPA routing
- [x] Logo y assets en /public
- [x] Cloudinary configurado para imágenes

### 2. Backend (Node.js + Express)
- [x] Variables de entorno documentadas (.env.example)
- [x] Script de migración funciona
- [x] Cloudinary configurado
- [x] CORS configurado con FRONTEND_URL
- [x] Railway.json creado
- [x] JWT_SECRET configurado

### 3. Base de Datos (PostgreSQL)
- [x] Schema con todas las tablas
- [x] Índices creados
- [x] Triggers funcionando
- [x] Usuario admin por defecto

---

## 📦 Deploy Frontend (Vercel)

### Paso 1: Preparar el proyecto
```bash
cd Front
npm run build
```

Esto crea la carpeta `dist/` con los archivos optimizados.

### Paso 2: Subir a Vercel

#### Opción A: Desde GitHub (Recomendado)
1. **Subí tu código a GitHub**:
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **En Vercel** (https://vercel.com):
   - Click "Add New Project"
   - Importá tu repositorio `roseartacademy`
   - **Root Directory**: `Front`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Variables de Entorno en Vercel**:
   ```
   VITE_API_URL=https://tu-backend.railway.app/api
   ```

4. Click "Deploy" 🚀

#### Opción B: CLI de Vercel
```bash
cd Front
npm i -g vercel
vercel login
vercel --prod
```

---

## 🐘 Deploy Backend (Railway)

### Paso 1: Crear cuenta en Railway
1. Andá a https://railway.app
2. Registrate con GitHub
3. Click "New Project"

### Paso 2: Crear Base de Datos PostgreSQL
1. Click "New" → "Database" → "Add PostgreSQL"
2. Railway genera automáticamente:
   - `DATABASE_URL` (connection string completa)
   - O variables individuales: `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

### Paso 3: Deploy Backend
1. Click "New" → "GitHub Repo"
2. Seleccioná `roseartacademy`
3. **Root Directory**: `Back`
4. Railway detecta automáticamente Node.js

### Paso 4: Variables de Entorno en Railway
Andá a tu servicio → Variables → Add Variables:

```env
# Database (Railway las provee automáticamente si usaste su PostgreSQL)
DB_USER=${{PGUSER}}
DB_PASSWORD=${{PGPASSWORD}}
DB_HOST=${{PGHOST}}
DB_PORT=${{PGPORT}}
DB_NAME=${{PGDATABASE}}
DB_DEPLOY=true

# Server
PORT=3001
NODE_ENV=production

# JWT
JWT_SECRET=tu_clave_super_secreta_de_produccion_cambiar_esto

# CORS - Frontend URL
FRONTEND_URL=https://tu-app.vercel.app

# Cloudinary (las mismas que tenés en local)
CLOUDINARY_CLOUD_NAME=dlfrdn1c1
CLOUDINARY_API_KEY=475878233258432
CLOUDINARY_API_SECRET=G4vPJt8Be6KvufifZFwF-AB8MuI
```

### Paso 5: Deploy y Migración
Railway ejecuta automáticamente:
```bash
npm run migrate && npm start
```

---

## 🌐 Conectar Frontend con Backend

### 1. Obtener URL del Backend
En Railway, copiá tu URL de deploy (ejemplo: `rosefinearts-production.up.railway.app`)

### 2. Actualizar Frontend
En Vercel → Settings → Environment Variables:
```
VITE_API_URL=https://rosefinearts-production.up.railway.app/api
```

### 3. Redeploy Frontend
Vercel → Deployments → Latest → "Redeploy"

---

## 🔐 Seguridad en Producción

### ⚠️ IMPORTANTE - Cambiar estos valores:

1. **JWT_SECRET**: Generá uno nuevo:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Contraseña Admin**: Después del primer deploy, cambiá la contraseña por defecto (`admin123`)

3. **CORS**: Asegurate que `FRONTEND_URL` sea la URL correcta de Vercel

---

## 📱 Testing Post-Deploy

### 1. Frontend
- ✅ Navegación entre páginas
- ✅ Formulario de contacto
- ✅ Galerías se cargan
- ✅ Imágenes de Cloudinary se ven
- ✅ Login admin funciona

### 2. Backend
- ✅ GET /api/health responde 200
- ✅ GET /api/galleries devuelve galerías
- ✅ POST /api/auth/login funciona
- ✅ Upload de imágenes a Cloudinary

### 3. Base de Datos
- ✅ Tablas creadas
- ✅ Admin user existe
- ✅ Categorías seed cargadas

---

## 🌳 Flujo de Ramas Git

### Setup Inicial
```bash
# Crear ramas
git checkout -b develop
git push origin develop

git checkout -b yani
git push origin yani

# Volver a main
git checkout main
```

### Workflow Diario

#### 1. Trabajar en tu rama `yani`:
```bash
git checkout yani
# ... hacés cambios ...
git add .
git commit -m "feat: nuevo feature"
git push origin yani
```

#### 2. Merge a `develop` para testing:
```bash
git checkout develop
git merge yani
git push origin develop
```

#### 3. Deploy a producción (main):
```bash
# Cuando todo funciona en develop
git checkout main
git merge develop
git push origin main
```

### Protección de Ramas
En GitHub → Settings → Branches → Add rule:
- **Branch name pattern**: `main`
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass

---

## 🆘 Troubleshooting

### Frontend no carga
```bash
# Verificar build local
cd Front
npm run build
npm run preview
```

### Backend no responde
```bash
# Ver logs en Railway
railway logs
```

### Error de CORS
- Verificá que `FRONTEND_URL` en Railway sea la URL exacta de Vercel
- Incluí `https://` y NO pongas `/` al final

### Imágenes no suben
- Verificá credenciales de Cloudinary
- Verificá que el límite de 5MB no se exceda

---

## 📊 Monitoreo

### Railway
- Dashboard → Ver uso de recursos
- Logs en tiempo real
- Métricas de rendimiento

### Vercel
- Analytics de tráfico
- Logs de deploy
- Web Vitals

---

## 🔄 Actualizar Producción

```bash
# 1. Trabajar en yani
git checkout yani
# ... cambios ...
git commit -am "fix: corrección importante"
git push origin yani

# 2. Merge a develop y testear
git checkout develop
git merge yani
git push origin develop

# 3. Deploy a producción
git checkout main
git merge develop
git push origin main
```

Railway y Vercel re-deployean automáticamente cuando pusheás a `main`.

---

## ✨ URLs Finales

Después del deploy, tus URLs serán:

- **Frontend**: `https://rosefinearts.vercel.app`
- **Backend**: `https://rosefinearts-production.up.railway.app`
- **Admin**: `https://rosefinearts.vercel.app/admin/login`

**Credenciales Admin por defecto**:
- Email: `admin@rosefinearts.com`
- Password: `admin123` (⚠️ CAMBIAR en producción)

---

¡Listo para producción! 🚀🎨
