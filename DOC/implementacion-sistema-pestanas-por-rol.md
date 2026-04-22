# Implementación de Sistema de Pestañas por Rol

## Problema Detectado

El Dashboard original mostraba todas las opciones de navegación en tarjetas estáticas, lo que no permitía una navegación fluida ni personalizada según el rol del usuario. Cada usuario tenía que navegar a diferentes páginas para acceder a diferentes funcionalidades.

## Solución Implementada

Se ha implementado un sistema de navegación por pestañas específico para cada rol de usuario, permitiendo una navegación fluida dentro del Dashboard sin necesidad de salir de la página.

### Configuración de Pestañas por Rol

**Candidatos (7 pestañas):**
- Resumen: Vista general con enlaces a todas las secciones
- Empleos: Acceso a búsqueda de empleo
- Cursos: Acceso a búsqueda de cursos
- Aplicaciones: Gestión de aplicaciones enviadas
- Guardados: Cursos guardados
- Currículum: Gestión del currículum personalizado
- Perfil: Información del perfil del candidato

**Empresas - Empleados (5 pestañas):**
- Resumen: Vista general con enlaces a todas las secciones
- Publicar Oferta: Crear nuevas ofertas de empleo
- Mis Ofertas: Gestión de ofertas publicadas
- Ver Ofertas: Explorar ofertas de otras empresas
- Perfil: Información de la empresa

**Empresas - Estudiantes (5 pestañas):**
- Resumen: Vista general con enlaces a todas las secciones
- Publicar Curso: Crear nuevos cursos
- Mis Cursos: Gestión de cursos publicados
- Ver Cursos: Explorar cursos de otras plataformas
- Perfil: Información de la empresa

**Empresas - Híbridas (8 pestañas):**
- Resumen: Vista general con enlaces a todas las secciones
- Publicar Oferta: Crear nuevas ofertas de empleo
- Mis Ofertas: Gestión de ofertas publicadas
- Publicar Curso: Crear nuevos cursos
- Mis Cursos: Gestión de cursos publicados
- Ver Ofertas: Explorar ofertas de otras empresas
- Ver Cursos: Explorar cursos de otras plataformas
- Perfil: Información de la empresa

## Archivos Modificados

### DashboardPage.jsx

**Antes:**
```jsx
// Estructura basada en tarjetas estáticas por rol
{isCandidate() && (
  <div className="dashboard-section">
    <h2>Para Candidatos</h2>
    <div className="dashboard-grid">
      <Link to="/empleos" className="dashboard-card">...</Link>
      <Link to="/cursos" className="dashboard-card">...</Link>
      // ...
    </div>
  </div>
)}
```

**Después:**
```jsx
// Sistema de pestañas dinámico
const [activeTab, setActiveTab] = useState('overview');

const getCandidateTabs = () => [
  { id: 'overview', label: 'Resumen', icon: '📊' },
  { id: 'jobs', label: 'Empleos', icon: '💼', link: '/empleos' },
  { id: 'courses', label: 'Cursos', icon: '📚', link: '/cursos' },
  // ...
];

<div className="dashboard-tabs">
  {tabs.map(tab => (
    <button
      key={tab.id}
      className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
      onClick={() => setActiveTab(tab.id)}
    >
      <span className="tab-icon">{tab.icon}</span>
      <span className="tab-label">{tab.label}</span>
    </button>
  ))}
</div>
```

### DashboardPage.css

**Estilos agregados:**
```css
/* Dashboard Tabs */
.dashboard-tabs {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border);
  overflow-x: auto;
  flex-wrap: wrap;
}

.dashboard-tab {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.dashboard-tab.active {
  background-color: var(--color-gold);
  color: var(--color-black);
  border-color: var(--color-gold);
}

.tab-content-placeholder {
  text-align: center;
  padding: var(--spacing-2xl);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
}
```

## Funcionalidad Implementada

### Comportamiento
1. **Pestaña Resumen**: Muestra todas las opciones de navegación como tarjetas con enlaces directos
2. **Pestañas Específicas**: Al seleccionar una pestaña específica, muestra un placeholder con un enlace directo a la página correspondiente
3. **Estado Activo**: La pestaña activa se resalta con color dorado según la paleta de la aplicación
4. **Responsive**: Las pestañas se ajustan automáticamente en dispositivos móviles con scroll horizontal
5. **Rol Dinámico**: Las pestañas cambian automáticamente según el rol del usuario autenticado

### Características
- **Navegación Fluida**: Los usuarios pueden cambiar entre secciones sin salir del Dashboard
- **Personalización por Rol**: Cada tipo de usuario tiene sus propias pestañas relevantes
- **Iconos Visuales**: Cada pestaña tiene un emoji icono para mejor identificación visual
- **Estado React**: Usa `useState` para gestionar la pestaña activa
- **Enlaces Directos**: Cada pestaña tiene un enlace directo a su página correspondiente

## Impacto de la Mejora

### UX (Experiencia de Usuario)
- **Navegación Intuitiva**: Los usuarios pueden acceder rápidamente a diferentes secciones
- **Contexto Mantenido**: Los usuarios permanecen en el Dashboard mientras navegan
- **Identificación Visual**: Iconos y colores ayudan a identificar el rol y las pestañas
- **Accesibilidad**: Las pestañas son clickeables y tienen estados hover/active claros

### Mantenibilidad
- **Código Organizado**: Cada configuración de pestañas está en su propia función
- **Escalabilidad**: Fácil agregar nuevas pestañas o roles
- **Separación de Concerns**: Lógica de pestañas separada del renderizado
- **Consistencia**: Patrón reutilizable para futuros componentes con pestañas

### Desarrollo
- **State Management**: Uso de React hooks para gestionar el estado de pestañas
- **Component Dinámico**: El componente se adapta según el rol del usuario
- **CSS Modular**: Estilos específicos para el sistema de pestañas
- **Performance**: Renderizado condicional para contenido de pestañas

## Actualización: Implementación Global de TabsNavigation

### Cambios Realizados

Se ha extraído la lógica de pestañas del Dashboard a un componente reutilizable `TabsNavigation` que ahora aparece en todas las páginas de usuarios autenticados, justo debajo del Navbar.

**Nuevo Componente:**
- `src/components/navigation/TabsNavigation.jsx` - Componente de navegación por pestañas
- `src/components/navigation/TabsNavigation.css` - Estilos CSS específicos

**Archivos Modificados:**
- `src/App.jsx` - Integración de TabsNavigation debajo del Navbar
- `src/pages/panel/DashboardPage.jsx` - Eliminación de pestañas duplicadas
- `src/pages/panel/DashboardPage.css` - Eliminación de estilos CSS duplicados

### Comportamiento Actual

**TabsNavigation Global:**
- Aparece en todas las páginas cuando el usuario está autenticado
- Se posiciona justo debajo del Navbar
- Es sticky (fijo) con scroll horizontal
- Muestra pestañas específicas según el rol del usuario
- La pestaña activa se resalta según la ruta actual

**DashboardPage:**
- Mantiene la vista de resumen con tarjetas de navegación
- Ya no tiene pestañas internas duplicadas
- Sirve como página de inicio del dashboard

### Ventajas de la Implementación Global

1. **Consistencia**: Los usuarios tienen las mismas opciones de navegación en todas las páginas
2. **Accesibilidad**: Navegación rápida sin volver al dashboard
3. **UX Mejorada**: Contexto de navegación siempre visible
4. **Mantenibilidad**: Lógica centralizada en un solo componente
5. **Escalabilidad**: Fácil agregar nuevas pestañas o modificar existentes

## Próximos Pasos Sugeridos

1. Implementar contenido real dentro de cada pestaña en lugar de placeholders
2. Agregar animaciones de transición entre pestañas
3. Implementar persistencia de pestaña activa en localStorage
4. Agregar notificaciones/badges en pestañas (ej: número de aplicaciones nuevas)
5. Implementar búsqueda/filtrado dentro de pestañas específicas
6. Agregar accesibilidad mejorada (teclado, screen readers)
7. Considerar agregar indicadores de estado (ej: número de elementos en cada pestaña)
