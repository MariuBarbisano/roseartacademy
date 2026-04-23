# 🎨 Rose Fine Arts Academy - Plataforma Web para Escuela de Arte

Plataforma web completa para gestionar una escuela de arte con galerías, obras, sistema de administración y contacto.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** + **Express**
- **PostgreSQL** (Base de datos)
- **Cloudinary** (Almacenamiento de imágenes en la nube)
- **JWT** (Autenticación)
- **Multer** (Carga de imágenes)
- **bcryptjs** (Encriptación de contraseñas)

### Frontend
- **React 18**
- **Vite** (Build tool)
- **Redux Toolkit** (State management)
- **React Router** (Routing)
- **Tailwind CSS** (Estilos)
- **Framer Motion** (Animaciones)
- **React Hook Form** (Formularios)
- **Axios** (HTTP client)

## 📋 Prerrequisitos

- **Node.js** (versión 18 o superior)
- **PostgreSQL** (versión 12 o superior)
- **Cuenta en Cloudinary** (gratis hasta 25GB) - [Registrarse aquí](https://cloudinary.com/users/register/free)
- **npm** o **yarn**

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
cd rosefinearts
```

### 2. Configurar el Backend

```bash
cd Back

# Instalar dependencias
npm install

# Copiar archivo de entorno
copy .env.example .env
```

Editar el archivo `.env` con tus datos de PostgreSQL y Cloudinary:

```env
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rosefinearts
DB_DEPLOY=false

PORT=3001
NODE_ENV=development
JWT_SECRET=tu_clave_secreta_muy_segura

FRONTEND_URL=http://localhost:5173

# Cloudinary (REQUERIDO para deployment)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

📌 **IMPORTANTE:** Para obtener las credenciales de Cloudinary, lee la guía completa en [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md)

### 3. Crear la Base de Datos

```bash
# En PostgreSQL, crear la base de datos
psql -U postgres
CREATE DATABASE rosefinearts;
\q

# Ejecutar las migraciones
npm run migrate
```

### 4. Configurar el Frontend

```bash
cd ../Front

# Instalar dependencias
npm install

# El archivo .env ya está creado con la configuración por defecto
```

## ▶️ Ejecutar el Proyecto

### Opción 1: Ejecutar Backend y Frontend por separado

**Terminal 1 - Backend:**
```bash
cd Back
npm run dev
```
El backend estará corriendo en `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd Front
npm run dev
```
El frontend estará corriendo en `http://localhost:5173`

### Opción 2: Ejecutar con un solo comando (desde la raíz)

Podés crear scripts en un `package.json` en la raíz del proyecto para ejecutar ambos simultáneamente.

## 🔑 Credenciales por Defecto

Para acceder al panel de administración:

- **URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@rosefinearts.com`
- **Contraseña:** `admin123`

⚠️ **IMPORTANTE:** Cambiar estas credenciales en producción.

## 📁 Estructura del Proyecto

```
rosefinearts/
├── Back/                      # Backend (Node.js + Express)
│   ├── database/             # Configuración y migraciones de BD
│   ├── middlewares/          # Middlewares (auth, upload)
│   ├── models/               # Modelos de datos
│   ├── routes/               # Rutas de la API
│   ├── uploads/              # Carpeta para imágenes subidas
│   ├── server.js             # Servidor principal
│   ├── package.json
│   └── .env
│
├── Front/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── layouts/          # Layouts (Main, Admin)
│   │   ├── pages/            # Páginas (públicas y admin)
│   │   ├── services/         # Configuración de API
│   │   ├── store/            # Redux store y slices
│   │   ├── App.jsx           # Componente principal
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Estilos globales
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🎯 Funcionalidades

### Área Pública
✅ Landing page con diseño atractivo y animaciones  
✅ Galería de obras de arte con filtros por categoría  
✅ Vista detallada de cada galería  
✅ Página "Nosotros" con información de la escuela  
✅ Formulario de contacto  
✅ Bot de WhatsApp flotante  
✅ Diseño responsive

### Panel de Administración
✅ Dashboard con estadísticas  
✅ CRUD de Galerías (crear, editar, eliminar)  
✅ CRUD de Obras de Arte con carga de imágenes  
✅ CRUD de Categorías  
✅ Gestión de mensajes de contacto  
✅ Sistema de autenticación con JWT  
✅ Interfaz intuitiva y moderna

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/validate` - Validar token
- `GET /api/auth/me` - Obtener usuario actual

### Galerías
- `GET /api/galleries` - Listar todas las galerías
- `GET /api/galleries/:slug` - Obtener galería por slug
- `POST /api/galleries` - Crear galería (protegida)
- `PUT /api/galleries/:id` - Actualizar galería (protegida)
- `DELETE /api/galleries/:id` - Eliminar galería (protegida)

### Obras de Arte
- `GET /api/artworks` - Listar todas las obras
- `GET /api/artworks/:id` - Obtener obra por ID
- `POST /api/artworks` - Crear obra (protegida)
- `PUT /api/artworks/:id` - Actualizar obra (protegida)
- `DELETE /api/artworks/:id` - Eliminar obra (protegida)

### Categorías
- `GET /api/categories` - Listar todas las categorías
- `POST /api/categories` - Crear categoría (protegida)
- `PUT /api/categories/:id` - Actualizar categoría (protegida)
- `DELETE /api/categories/:id` - Eliminar categoría (protegida)

### Contacto
- `GET /api/contact` - Listar mensajes (protegida)
- `POST /api/contact` - Enviar mensaje
- `PUT /api/contact/:id/read` - Marcar como leído (protegida)
- `DELETE /api/contact/:id` - Eliminar mensaje (protegida)

## 🚀 Deploy a Producción

Para deployar esta aplicación a producción, lee las guías detalladas:

📘 **Guía Completa**: [DEPLOY.md](DEPLOY.md) - Instrucciones paso a paso completas  
⚡ **Inicio Rápido**: [QUICK_START.md](QUICK_START.md) - Deploy en 5 minutos

### Verificar antes de deployar

```bash
node check-deploy.js
```

Este script verifica que todo esté configurado correctamente.

### Stack de Producción

- **Frontend**: Vercel (gratis)
- **Backend**: Railway (gratis hasta $5/mes de crédito)
- **Base de Datos**: Railway PostgreSQL (incluido)
- **Imágenes**: Cloudinary (gratis hasta 25GB)

## 🌳 Estrategia de Ramas (Git Flow)

Este proyecto usa una estrategia de 3 ramas:

```
main (producción) ← develop (testing) ← yani (desarrollo)
```

### Ramas

- **`main`**: Producción - código estable que se auto-deploya
- **`develop`**: Pre-producción - testing antes de merge a main
- **`yani`**: Desarrollo - trabajo diario, features nuevos

### Workflow de Desarrollo

```bash
# 1. Trabajar en tu rama personal
git checkout yani
git pull origin yani

# ... hacer cambios ...
git add .
git commit -m "feat: nueva funcionalidad"
git push origin yani

# 2. Merge a develop para testing
git checkout develop
git merge yani
git push origin develop

# 3. Cuando todo funciona, merge a main (producción)
git checkout main
git merge develop
git push origin main
```

### Crear las ramas inicialmente

```bash
# Crear develop
git checkout -b develop
git push origin develop

# Crear yani
git checkout -b yani
git push origin yani

# Volver a main
git checkout main
```

## 🔒 Seguridad

- ✅ Autenticación con JWT
- ✅ Contraseñas hasheadas con bcrypt
- ✅ CORS configurado
- ✅ Helmet.js para headers de seguridad
- ✅ Variables de entorno para datos sensibles
- ✅ Validación de inputs
- ✅ Protección contra SQL injection (queries parametrizadas)

## 📚 Documentación Adicional

- [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) - Configurar Cloudinary paso a paso
- [COMO_AGREGAR_LOGO.md](COMO_AGREGAR_LOGO.md) - Cómo cambiar el logo
- [COLORES.md](COLORES.md) - Paleta de colores del proyecto
- [DEPLOY.md](DEPLOY.md) - Guía completa de deployment
- [QUICK_START.md](QUICK_START.md) - Deploy rápido

## 🐛 Troubleshooting

### Error al conectar a la base de datos
- Verificá que PostgreSQL esté corriendo
- Verificá las credenciales en el archivo `.env`
- Verificá que la base de datos `rosefinearts` exista

### Error al subir imágenes
- Verificá las credenciales de Cloudinary en `.env`
- Verificá que el tamaño de la imagen no exceda 5MB
- Verificá el formato de imagen (JPG, PNG, WEBP)

### Error de CORS
- Verificá que `FRONTEND_URL` en el backend coincida con la URL del frontend
- En producción, actualizá `FRONTEND_URL` con la URL de Vercel

### Problemas con el build
```bash
# Limpiar node_modules y reinstalar
cd Front
rm -rf node_modules package-lock.json
npm install

cd ../Back
rm -rf node_modules package-lock.json
npm install
```

## 📧 Contacto y Soporte

Para consultas sobre el proyecto:
- Email: info@rosefinearts.com
- GitHub Issues: [github.com/MariuBarbisano/roseartacademy/issues](https://github.com/MariuBarbisano/roseartacademy/issues)

## 📝 Licencia

Este proyecto es privado y de uso exclusivo de Rose Fine Arts Academy.

---

Desarrollado con ❤️ y 🎨 por Rose Fine Arts Academy

¿Listo para deployar? → Lee [QUICK_START.md](QUICK_START.md)
- `GET /api/artworks/:id` - Obtener obra por ID
- `POST /api/artworks` - Crear obra (protegida)
- `PUT /api/artworks/:id` - Actualizar obra (protegida)
- `DELETE /api/artworks/:id` - Eliminar obra (protegida)

### Categorías
- `GET /api/categories` - Listar todas las categorías
- `POST /api/categories` - Crear categoría (protegida)
- `PUT /api/categories/:id` - Actualizar categoría (protegida)
- `DELETE /api/categories/:id` - Eliminar categoría (protegida)

### Contacto
- `POST /api/contact` - Enviar mensaje (público)
- `GET /api/contact` - Listar mensajes (protegida)
- `PUT /api/contact/:id/read` - Marcar como leído (protegida)
- `DELETE /api/contact/:id` - Eliminar mensaje (protegida)

## 🎨 Personalización

### Colores (Tailwind)
Podés cambiar los colores principales en `Front/tailwind.config.js`:

```js
colors: {
  primary: {
    // Cambiar estos valores
    600: '#e63950',
    700: '#b31d35',
    // ...
  }
}
```

### Logo
Para agregar tu logo personalizado:

1. Guarda tu logo en `Front/public/logo.png`
2. Opcionalmente, guarda un favicon en `Front/public/favicon.ico`
3. Lee la guía completa: [COMO_AGREGAR_LOGO.md](COMO_AGREGAR_LOGO.md)

La guía incluye instrucciones paso a paso para actualizar:
- Navbar
- Footer
- Panel de administración
- Favicon del navegador

### WhatsApp
Cambiar el número de teléfono en `Front/src/components/WhatsAppButton.jsx`:

```js
const phoneNumber = '5491112345678'; // Tu número real
```

## 📦 Build para Producción

### Backend
```bash
cd Back
npm start
```

### Frontend
```bash
cd Front
npm run build
npm run preview
```

Los archivos de producción estarán en `Front/dist/`

## 🐛 Troubleshooting

### Error de conexión a PostgreSQL
- Verificar que PostgreSQL esté corriendo
- Verificar credenciales en `.env`
- Verificar que la base de datos exista

### Error al subir imágenes a Cloudinary
- Verificar que las credenciales de Cloudinary estén correctamente configuradas en `.env`
- Verificar que hayas ejecutado `npm install` después de agregar las dependencias de Cloudinary
- Ver guía completa en [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md)

### Error CORS
- Verificar que `FRONTEND_URL` en `.env` del backend coincida con la URL del frontend

## 📝 Próximas Mejoras

- [ ] Sistema de roles (admin, editor, viewer)
- [ ] Optimización de imágenes (thumbnails automáticos)
- [ ] Búsqueda avanzada de obras
- [ ] Sistema de comentarios
- [ ] Integración con redes sociales
- [ ] Newsletter funcional
- [ ] Multi-idioma
- [ ] Dark mode

## 👨‍💻 Desarrollo

Este proyecto está diseñado para ser fácilmente extensible. Podés agregar nuevas funcionalidades siguiendo la estructura existente.

## 📄 Licencia

Este proyecto es de código libre para uso educativo y personal.

---

**Desarrollado con ❤️ para Rose Fine Arts Academy**
