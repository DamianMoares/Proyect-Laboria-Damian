# Despliegue en GitHub Pages

## Problema Detectado

El proyecto tenía varios problemas que impedían su despliegue correcto en GitHub Pages:
- Rutas de imágenes incorrectas usando rutas relativas que no funcionan en producción
- Falta de configuración en Vite para despliegue
- Archivo .env sin ejemplo de referencia
- Carpeta DOC en .gitignore (documentación no se subía al repositorio)

## Solución Implementada

### 1. Configuración de Vite para Despliegue

Se actualizó `vite.config.js` con configuración específica para GitHub Pages:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  // Descomenta y establece el nombre de tu repositorio para despliegue en GitHub Pages
  // base: '/Proyecto-Laboria-Damián/',
});
```

**Instrucciones:**
- Si el repositorio se llama `usuario/repo-name`, descomenta la línea `base` y cámbiala a: `base: '/repo-name/'`
- Si usas dominio personal, usa: `base: '/'`

### 2. Corrección de Rutas de Imágenes

Se cambiaron todas las rutas de imágenes de rutas relativas a imports estáticos de Vite:

**Antes:**
```jsx
<img src="/src/assets/img/Laboria_fondo_Blanco.png" alt="Laboria-V2" />
<img src="../../assets/img/Laboria_fondo_Negro.png" alt="Laboria-V2" />
```

**Después:**
```jsx
import logoBlanco from './assets/img/Laboria_fondo_Blanco.png';
import logoNegro from './assets/img/Laboria_fondo_Negro.png';

<img src={logoBlanco} alt="Laboria-V2" />
<img src={logoNegro} alt="Laboria-V2" />
```

**Archivos modificados:**
- `src/App.jsx` - Import y uso de logoBlanco
- `src/pages/panel/DashboardPage.jsx` - Import y uso de logoNegro
- `src/pages/autenticacion/LoginPage.jsx` - Import y uso de logoNegro
- `src/pages/autenticacion/RegisterPage.jsx` - Import y uso de logoNegro

### 3. Archivo .env.example

Se creó `.env.example` para documentar las variables de entorno necesarias:

```env
# Environment Variables Example
# Copy this file to .env and fill in the actual values

# Vite Configuration
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=Laboria-V2

# Add any other environment variables needed for your application
```

### 4. Actualización de .gitignore

Se eliminó `DOC` de `.gitignore` para que la documentación se incluya en el repositorio, según las reglas del proyecto.

## Instrucciones de Despliegue

### Opción 1: GitHub Pages (Manual)

1. **Configurar el base path en vite.config.js:**
   ```javascript
   // Descomenta y cambia el nombre del repositorio
   base: '/nombre-de-tu-repositorio/',
   ```

2. **Construir el proyecto:**
   ```bash
   npm run build
   ```

3. **Subir a GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Configurar GitHub Pages:**
   - Ve a Settings > Pages
   - En "Source", selecciona "Deploy from a branch"
   - Selecciona "main" y carpeta "/root" o "/dist"
   - Haz clic en Save

### Opción 2: GitHub Actions (Automático)

1. **Crear el archivo `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
   workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

2. **Configurar vite.config.js para el nombre del repositorio:**
   ```javascript
   base: '/nombre-de-tu-repositorio/',
   ```

3. **Hacer push y GitHub Actions se encargará del despliegue automático**

### Opción 3: Vercel/Netlify

1. **Conectar el repositorio a Vercel o Netlify**
2. **Configurar el comando de build:** `npm run build`
3. **Configurar el directorio de salida:** `dist`
4. **Desplegar**

## Archivos Modificados

1. `vite.config.js` - Configuración de build y base path
2. `src/App.jsx` - Import de logoBlanco
3. `src/pages/panel/DashboardPage.jsx` - Import de logoNegro
4. `src/pages/autenticacion/LoginPage.jsx` - Import de logoNegro
5. `src/pages/autenticacion/RegisterPage.jsx` - Import de logoNegro
6. `.env.example` - Nuevo archivo con ejemplo de variables de entorno
7. `.gitignore` - Eliminada carpeta DOC de la lista de ignorados

## Notas Importantes

### Imágenes

Asegúrate de que las imágenes existan en `src/assets/img/`:
- `Laboria_fondo_Blanco.png`
- `Laboria_fondo_Negro.png`

Si no tienes estas imágenes, puedes:
1. Agregar las imágenes reales a la carpeta
2. Usar placeholders temporales
3. Commentar temporalmente las líneas de importación y uso de logos

### Variables de Entorno

- El archivo `.env` no se sube a Git (está en .gitignore)
- Usa `.env.example` como referencia
- En producción, configura las variables en la plataforma de despliegue

### React Router

El proyecto usa `BrowserRouter` que requiere configuración especial en GitHub Pages. Si experimentas problemas de enrutamiento al recargar la página, considera:

1. Usar `HashRouter` en lugar de `BrowserRouter` en `src/App.jsx`:
   ```jsx
   import { HashRouter as Router } from 'react-router-dom';
   ```

2. O agregar un archivo `_redirects` en la carpeta `public/`:
   ```
   /* /index.html 200
   ```

## Verificación del Despliegue

Después del despliegue, verifica:

1. **La página carga correctamente** - Visita la URL de GitHub Pages
2. **Las imágenes se muestran** - Revisa el logo en navbar y páginas de autenticación
3. **La navegación funciona** - Prueba los enlaces entre páginas
4. **No hay errores en consola** - Abre las DevTools para verificar

## Solución de Problemas Comunes

### Problema: Página en blanco después del despliegue

**Solución:** Verifica que el `base` en `vite.config.js` coincida con el nombre del repositorio.

### Problema: Las imágenes no cargan

**Solución:** Asegúrate de que las imágenes existan en `src/assets/img/` y que los imports sean correctos.

### Problema: Errores 404 al navegar

**Solución:** Considera usar `HashRouter` o configurar redirecciones en el servidor.

### Problema: Build falla

**Solución:** Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas.

## Impacto de la Mejora

### Mantenibilidad
- Configuración clara para despliegue en vite.config.js
- Rutas de imágenes correctas que funcionan en desarrollo y producción
- Documentación de variables de entorno en .env.example

### UX
- Sitio web funcional en GitHub Pages
- Imágenes que cargan correctamente
- Navegación fluida entre páginas

### Escalabilidad
- Fácil despliegue en otras plataformas (Vercel, Netlify)
- Configuración lista para CI/CD con GitHub Actions
- Variables de entorno documentadas para producción
