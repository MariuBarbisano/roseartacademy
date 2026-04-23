# 🌥️ Configuración de Cloudinary

Este proyecto usa **Cloudinary** para almacenar todas las imágenes en la nube. Esto es necesario para deployar en plataformas como Railway, Render o Vercel.

## 📝 Pasos para Configurar Cloudinary

### 1. Crear Cuenta en Cloudinary

1. Ve a [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Registrate con tu email (es gratis hasta 25GB)
3. Verifica tu email y accede al dashboard

### 2. Obtener Credenciales

Una vez en el dashboard de Cloudinary:

1. Ve a **Dashboard** (página principal)
2. Encontrarás tus credenciales en la sección **Account Details**:
   - **Cloud Name** (ejemplo: ``)
   - **API Key** (ejemplo: ``)
   - **API Secret** (ejemplo: ``)

### 3. Configurar Variables de Entorno

#### Para Desarrollo Local

Edita el archivo `Back/.env` y agrega tus credenciales:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

#### Para Producción (Railway/Render)

En tu plataforma de deployment, agrega estas variables de entorno:

**Railway:**
1. Ve a tu proyecto
2. Click en **Variables**
3. Agrega:
   - `CLOUDINARY_CLOUD_NAME` = tu cloud name
   - `CLOUDINARY_API_KEY` = tu api key
   - `CLOUDINARY_API_SECRET` = tu api secret

**Render:**
1. Ve a tu servicio
2. Click en **Environment**
3. Agrega las mismas 3 variables

### 4. Reinstalar Dependencias

```bash
cd Back
npm install
```

Esto instalará las nuevas dependencias:
- `cloudinary` (SDK de Cloudinary)
- `multer-storage-cloudinary` (Integración con Multer)

### 5. Reiniciar el Servidor

```bash
npm run dev
```

## ✅ Verificar que Funciona

1. Accede al panel de admin: `http://localhost:5173/admin/login`
2. Crea una nueva galería y sube una imagen
3. La imagen debería subirse a Cloudinary
4. Ve al dashboard de Cloudinary → **Media Library** para ver tus imágenes
5. Las imágenes estarán en la carpeta `rosefinearts/`

## 📂 Organización en Cloudinary

Las imágenes se guardan automáticamente en la carpeta `rosefinearts/` en Cloudinary. Puedes ver todas tus imágenes en:

**Dashboard → Media Library → rosefinearts**

## 🔧 Configuración Avanzada

### Cambiar el Tamaño Máximo de Imágenes

En `Back/middlewares/upload.middleware.js`, línea 17:

```javascript
transformation: [{ width: 1920, height: 1920, crop: 'limit' }]
```

- `width` y `height`: Dimensiones máximas
- `crop: 'limit'`: Mantiene proporciones, no supera el tamaño
- Otras opciones: `fill`, `fit`, `scale`, `crop`

### Cambiar la Carpeta de Destino

En `Back/middlewares/upload.middleware.js`, línea 16:

```javascript
folder: 'rosefinearts',
```

Cambia `'rosefinearts'` por el nombre que prefieras.

### Agregar Watermark Automático

Puedes agregar transformaciones adicionales:

```javascript
transformation: [
  { width: 1920, height: 1920, crop: 'limit' },
  { overlay: 'logo', gravity: 'south_east', width: 100, opacity: 50 }
]
```

## 🌍 URLs de las Imágenes

Con Cloudinary, las URLs de las imágenes serán algo como:

```
https://res.cloudinary.com/tu_cloud_name/image/upload/v1234567890/rosefinearts/imagen.jpg
```

Estas URLs son permanentes y optimizadas automáticamente para:
- ✅ Carga rápida (CDN global)
- ✅ Formato optimizado según el navegador (WebP automático)
- ✅ Responsive (puedes cambiar tamaño en la URL)

## 🆓 Límites del Plan Gratuito

- **Almacenamiento:** 25 GB
- **Bandwidth:** 25 GB/mes
- **Transformaciones:** 25,000/mes
- **Respaldo:** Automático

¡Es más que suficiente para empezar!

## ❓ Troubleshooting

### Error: "Invalid cloud_name"

- Verifica que copiaste bien el `CLOUDINARY_CLOUD_NAME`
- No incluyas espacios ni comillas adicionales
- Reinicia el servidor después de cambiar `.env`

### Error: "Must supply api_key"

- Verifica que las 3 variables estén configuradas en `.env`
- Asegúrate de que el archivo `.env` esté en la carpeta `Back/`

### Las imágenes no se ven en el frontend

- Las URLs de Cloudinary se guardan directamente en la BD
- No necesitas proxy `/uploads` en Vite
- Verifica en el navegador que la URL de la imagen sea de Cloudinary

### Migrar imágenes viejas de `uploads/` a Cloudinary

Si ya tenías imágenes en la carpeta local `uploads/`, tendrás que:

1. Subir manualmente a Cloudinary desde el dashboard
2. O actualizar los registros en la BD con las nuevas URLs

---

**¿Necesitas ayuda?** Consulta la [documentación oficial de Cloudinary](https://cloudinary.com/documentation)
