# 🎨 Paleta de Colores - Rose Fine Arts Academy

Esta es la paleta de colores extraída del logo oficial y configurada en Tailwind CSS.

## 🌈 Colores Principales

### Rosa/Magenta (primary)
Color principal del logo - vibrante y creativo
```
primary-50:  #fef1f7
primary-100: #fee5f0
primary-200: #ffcce3
primary-300: #ffa3cd
primary-400: #ff6aab
primary-500: #f9398d
primary-600: #E91E8C ⭐ Principal
primary-700: #c9116d
primary-800: #a6125a
primary-900: #8a144d
```

**Uso recomendado:**
- Botones principales
- Enlaces hover
- Badges importantes
- Fondos de secciones destacadas

### Dorado/Amarillo (gold)
Del logo - representa creatividad y excelencia
```
gold-50:  #fefbec
gold-100: #fef5c3
gold-200: #fde989
gold-300: #fcd846
gold-400: #fac515
gold-500: #F7B32B ⭐ Principal
gold-600: #d88806
gold-700: #b36209
gold-800: #914d0e
gold-900: #773f0f
```

**Uso recomendado:**
- Títulos especiales
- Iconos destacados
- Bordes decorativos
- Elementos premium

### Morado (purple)
Del logo - creatividad y arte
```
purple-50:  #faf5ff
purple-100: #f3e8ff
purple-200: #e9d5ff
purple-300: #d8b4fe
purple-400: #c084fc
purple-500: #a855f7
purple-600: #9333ea ⭐ Principal
purple-700: #7e22ce
purple-800: #6b21a8
purple-900: #581c87
```

**Uso recomendado:**
- Backgrounds alternativos
- Categorías específicas
- Tags
- Elementos secundarios

### Azul (blue)
Del logo - confianza y profesionalismo
```
blue-50:  #eff6ff
blue-100: #dbeafe
blue-200: #bfdbfe
blue-300: #93c5fd
blue-400: #60a5fa
blue-500: #3b82f6 ⭐ Principal
blue-600: #2563eb
blue-700: #1d4ed8
blue-800: #1e40af
blue-900: #1e3a8a
```

**Uso recomendado:**
- Enlaces normales
- Notificaciones informativas
- Fondos suaves
- Elementos de confianza

### Oscuro (dark)
Para fondos y contraste
```
dark-700: #2a2a2a
dark-800: #1a1a1a
dark-900: #0f0f0f ⭐ Principal
```

## 📝 Cómo Usar los Colores

### En Componentes React/JSX

```jsx
// Fondo rosa
<div className="bg-primary-600">

// Texto dorado
<h1 className="text-gold-500">

// Borde morado
<div className="border-2 border-purple-600">

// Hover azul
<button className="hover:bg-blue-500">

// Degradado
<div className="bg-gradient-to-r from-primary-600 to-purple-600">
```

### Combinaciones Recomendadas

#### Vibrante y Creativa
```jsx
<div className="bg-gradient-to-br from-primary-500 via-purple-500 to-blue-500">
```

#### Elegante y Premium
```jsx
<div className="bg-dark-900 text-gold-500">
```

#### Suave y Amigable
```jsx
<div className="bg-primary-50 text-primary-700">
```

#### Llamado a la Acción
```jsx
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Inscribite Ahora
</button>
```

## 🎯 Ejemplos de Uso

### Botón Principal
```jsx
className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
```

### Botón Secundario
```jsx
className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg transition-colors"
```

### Tarjeta con Borde
```jsx
className="bg-white border-2 border-primary-200 hover:border-primary-500 rounded-xl p-6"
```

### Badge de Categoría
```jsx
className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
```

### Título con Degradado
```jsx
className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"
```

## 🚀 Personalización Avanzada

Si necesitas agregar más colores o modificar la paleta, edita:

```
Front/tailwind.config.js
```

En la sección `theme.extend.colors`

## 💡 Tips de Diseño

1. **Contraste**: Usa colores oscuros (700-900) sobre fondos claros y viceversa
2. **Consistencia**: Mantén el rosa (primary) como color principal en toda la app
3. **Jerarquía**: Usa gold para elementos premium, purple para categorías
4. **Accesibilidad**: Asegúrate que el contraste entre texto y fondo sea suficiente

---

**¿Necesitas más colores?** Puedes generar tonos adicionales en: https://uicolors.app/create
