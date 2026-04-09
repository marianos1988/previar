# 🛍️ Previar

Sistema de tienda online completo con catálogo de productos, carrito de compras y pedidos por WhatsApp.

## ✨ Características

- 🛒 **Carrito de compras** completo
- 📸 **Galería de imágenes** por producto
- 🔍 **Filtros por categorías**
- 💬 **Pedidos por WhatsApp** (sin comisiones)
- 📱 **100% Responsive** (móvil, tablet, desktop)
- 🚀 **Deploy rápido** en Vercel/Netlify
- ⚡ **Rendimiento optimizado** con Astro

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar tu tienda

Edita `src/config/clientConfig.js`:
```javascript
brand: {
  name: "Tu Tienda",
  slogan: "Tu slogan",
  logo: "🛍️"
}
```

### 3. Configurar WhatsApp

Crea archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

Edita `.env`:
```
PUBLIC_WHATSAPP_NUMBER=5491112345678
```

### 4. Agregar productos

Edita los archivos en `src/content/products/`:
```markdown
---
        nombre: Tu Producto
        precio: 1500
        images: 
                img1: 1.jpg
                img2: 2.jpg
        
        categoria: Tu Categoría
---

Descripción del producto aquí.
```

### 5. Agregar imágenes

Coloca las imágenes en `src/assets/tienda/products/`:
- Nomenclatura: `producto-X-Y.jpg`
- X = número del producto
- Y = número de imagen

Ejemplo: `producto-1-1.jpg`, `producto-1-2.jpg`

### 6. Optimizar imágenes (opcional)
```bash
node scripts/optimize-images.mjs
```

### 7. Ejecutar en desarrollo
```bash
npm run dev
```

### 8. Deploy en Vercel

1. Sube el proyecto a GitHub
2. Conecta en [Vercel](https://vercel.com)
3. Agrega la variable de entorno `PUBLIC_WHATSAPP_NUMBER`
4. Deploy!

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/tienda/    # Componentes de la tienda
│   │   ├── Card.jsx         # Tarjeta de producto
│   │   ├── ImgCarousel.jsx  # Galería de imágenes
│   │   ├── Filters.jsx      # Filtro de categorías
│   │   ├── ProductCart.jsx   # Items del carrito
│   │   └── BtnOrder.jsx     # Botón WhatsApp
│   ├── content/products/      # Archivos .md de productos
│   ├── assets/tienda/        # Imágenes de productos
│   ├── config/clientConfig.js # Configuración centralizada
│   └── pages/
│       ├── index.astro       # Página principal
│       ├── tienda.astro      # Catálogo completo
│       └── contacto.astro    # Página de contacto
├── .env.example              # Plantilla de variables
├── vercel.json              # Configuración Vercel
└── package.json
```

## 🎨 Personalización

### Colores (en CSS)
Los colores principales están definidos con variables CSS en cada archivo:
- `#c74b7a` - Rosa principal
- `#ff8fb3` - Rosa claro
- `#3d2232` - Rosa oscuro

### Tipografías
- Títulos: Playfair Display
- Cuerpo: Montserrat

## 📱 Resoluciones Soportadas

- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: ≤ 480px
- Mobile pequeño: ≤ 360px

## 💡 Tips

1. **Sin stock:** Los productos sin stock muestran botón deshabilitado
2. **Múltiples imágenes:** El carousel cambia de imagen con hover en desktop y swipe en móvil
3. **WhatsApp:** El mensaje incluye lista de productos, cantidades y total
4. **Filtros:** Los clientes pueden filtrar por múltiples categorías

## 🛠️ Tech Stack

- **Astro** - Framework web
- **React** - Componentes interactivos
- **CSS** - Estilos custom (sin frameworks)
- **Sharp** - Optimización de imágenes

---

¿Dudas o problemas? Crea un issue en el repositorio.
