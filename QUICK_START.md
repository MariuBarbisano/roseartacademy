# ⚡ Quick Start - Deploy Rápido

## 🚀 Deploy en 5 minutos

### 1️⃣ Frontend (Vercel)
```bash
# Subir código a GitHub
git add .
git commit -m "Initial production"
git push origin main

# En Vercel.com:
# - Importar repo roseartacademy
# - Root Directory: Front
# - Framework: Vite
# - Deploy
```

**Variable de entorno**:
```
VITE_API_URL=https://tu-backend.railway.app/api
```

---

### 2️⃣ Backend (Railway)

```bash
# En Railway.app:
# 1. New Project → Add PostgreSQL
# 2. New → Deploy from GitHub → roseartacademy
# 3. Root Directory: Back
```

**Variables de entorno en Railway**:
```env
# Database (Railway las da automáticamente)
DB_USER=${{PGUSER}}
DB_PASSWORD=${{PGPASSWORD}}
DB_HOST=${{PGHOST}}
DB_PORT=${{PGPORT}}
DB_NAME=${{PGDATABASE}}
DB_DEPLOY=true

PORT=3001
NODE_ENV=production

JWT_SECRET=GENERAR_NUEVO_SECRETO_SEGURO
FRONTEND_URL=https://tu-app.vercel.app

CLOUDINARY_CLOUD_NAME=dlfrdn1c1
CLOUDINARY_API_KEY=475878233258432
CLOUDINARY_API_SECRET=G4vPJt8Be6KvufifZFwF-AB8MuI
```

---

### 3️⃣ Conectar

1. Copiá URL de Railway
2. Pegala en Vercel → Environment Variables → `VITE_API_URL`
3. Redeploy en Vercel

---

## 🌳 Git Branches

```bash
# Crear ramas
git checkout -b develop
git push origin develop

git checkout -b yani
git push origin yani

git checkout main
```

**Flujo de trabajo**:
- `yani` → trabajo diario
- `develop` → testing
- `main` → producción (auto-deploy)

---

## ✅ Checklist Final

- [ ] Frontend en Vercel funcionando
- [ ] Backend en Railway respondiendo
- [ ] Base de datos migrada
- [ ] Variables de entorno configuradas
- [ ] CORS correcto (Frontend URL)
- [ ] Cloudinary funcionando
- [ ] Login admin funciona
- [ ] Imágenes suben correctamente

---

## 🔗 URLs

- **App**: https://rosefinearts.vercel.app
- **Admin**: https://rosefinearts.vercel.app/admin/login
- **API**: https://tu-backend.railway.app/api/health

**Admin**:
- Email: `admin@rosefinearts.com`
- Pass: `admin123` ⚠️ CAMBIAR

---

¡Listo! 🎨✨
