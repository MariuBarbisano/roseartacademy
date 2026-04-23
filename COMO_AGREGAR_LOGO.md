# 🎨 Cómo Agregar el Logo de Rose Fine Arts Academy

## 📁 Paso 1: Preparar el Logo

1. Guarda tu logo (la imagen que me mostraste) en dos versiones:
   - **Logo completo a color**: Para usar en el footer y páginas internas
   - **Logo simple/blanco**: Para usar en el navbar cuando tiene fondo oscuro

2. Formatos recomendados:
   - **PNG con fondo transparente** (ideal)
   - Tamaño recomendado: 200-300px de ancho
   - Peso máximo: 100KB

## 📂 Paso 2: Colocar los Archivos

Copia tus archivos de logo a:

```
Front/public/
  ├── logo.png          <- Logo principal a color
  ├── logo-white.png    <- Logo en blanco (opcional)
  └── favicon.ico       <- Favicon (icono de la pestaña)
```

## 🔧 Paso 3: Actualizar los Componentes

### Navbar (Front/src/components/Navbar.jsx)

Busca la línea 41-48 y reemplaza por:

```jsx
<Link to="/" className="flex items-center space-x-3">
  <img 
    src="/logo.png" 
    alt="Rose Fine Arts Academy" 
    className="h-12 w-auto"
  />
</Link>
```

### Footer (Front/src/components/Footer.jsx)

Busca la línea 15-17 y reemplaza por:

```jsx
<img 
  src="/logo.png" 
  alt="Rose Fine Arts Academy" 
  className="h-16 w-auto mb-4"
/>
```

### Admin Layout (Front/src/layouts/AdminLayout.jsx)

Busca la línea 42-52 y reemplaza por:

```jsx
<Link to="/admin" className="flex items-center space-x-3">
  {sidebarOpen ? (
    <img 
      src="/logo.png" 
      alt="Rose Fine Arts Academy" 
      className="h-10 w-auto"
    />
  ) : (
    <img 
      src="/logo.png" 
      alt="RFA" 
      className="h-10 w-10 object-contain mx-auto"
    />
  )}
</Link>
```

## 🌐 Paso 4: Actualizar el Favicon

### Opción A: Usar Favicon.ico

1. Crea un favicon desde tu logo en: https://favicon.io/
2. Descarga el `favicon.ico`
3. Guárdalo en `Front/public/favicon.ico`
4. Actualiza `Front/index.html` línea 5:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

### Opción B: Usar PNG

Si prefieres usar un PNG:

```html
<link rel="icon" type="image/png" href="/logo.png" />
```

## 🎯 Paso 5: Verificar

1. Reinicia el servidor de Vite si es necesario:
   ```bash
   cd Front
   npm run dev
   ```

2. Refresca el navegador (Ctrl + Shift + R para limpiar caché)

3. Verifica que el logo aparezca en:
   - ✅ Navbar (arriba a la izquierda)
   - ✅ Footer (abajo)
   - ✅ Admin panel (barra lateral)
   - ✅ Favicon (pestaña del navegador)

## 🔄 Alternativa: Logo Responsive

Si quieres que el logo cambie en móvil, usa:

```jsx
<Link to="/" className="flex items-center space-x-3">
  {/* Desktop */}
  <img 
    src="/logo.png" 
    alt="Rose Fine Arts Academy" 
    className="hidden md:block h-12 w-auto"
  />
  {/* Mobile - Solo icono */}
  <img 
    src="/logo-icon.png" 
    alt="RFA" 
    className="md:hidden h-10 w-10"
  />
</Link>
```

## 💡 Tips

- **Optimiza el peso del logo**: Usa [TinyPNG](https://tinypng.com/) para comprimir sin perder calidad
- **Usa SVG si es posible**: Los SVG escalan perfectamente y pesan menos
- **Logo en navbar con scroll**: Puedes hacer que el logo cambie de color cuando haces scroll
- **Retina ready**: Guarda una versión @2x para pantallas de alta resolución

## 🎨 Código Completo para Navbar con Logo Mejorado

Si quieres un logo que se adapte al scroll:

```jsx
<Link to="/" className="flex items-center space-x-3">
  <img 
    src={isScrolled ? "/logo.png" : "/logo-white.png"} 
    alt="Rose Fine Arts Academy" 
    className="h-12 w-auto transition-all duration-300"
  />
</Link>
```

## ❓ Troubleshooting

### El logo no se ve

- Verifica que el archivo esté en `Front/public/` (no en `Front/src/`)
- Asegúrate que la ruta empiece con `/` (ejemplo: `/logo.png`)
- Limpia el caché del navegador (Ctrl + Shift + R)
- Verifica que el nombre del archivo sea exacto (mayúsculas/minúsculas)

### El logo se ve pixelado

- Usa una imagen más grande (mínimo 300px de ancho)
- Usa formato SVG en lugar de PNG
- Asegúrate que sea PNG con buena resolución, no JPG

### El logo tapa el menú en móvil

- Ajusta el tamaño con clases responsive:
  ```jsx
  className="h-8 md:h-12 w-auto"
  ```

---

**¿Necesitas ayuda?** Guarda tu logo en `Front/public/logo.png` y decime, te actualizo el código automáticamente.
