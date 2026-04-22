# Edición y Eliminación de Perfiles

## Problema Detectado

Los usuarios no tenían la capacidad de editar su información de perfil (nombre, email, teléfono, etc.) ni de eliminar su cuenta desde la página de perfil. La funcionalidad de "Editar Perfil" existía como un botón pero no tenía implementación, y no había ninguna opción para eliminar la cuenta.

## Solución Implementada

Se implementó un sistema completo de edición de perfiles y eliminación de cuentas con las siguientes características:

### 1. Función `deleteAccount` en AuthContext

Se agregó una nueva función en `src/context/AuthContext.jsx` que permite eliminar la cuenta del usuario:
- Elimina el usuario del estado de la aplicación
- Limpia el localStorage (`laboria_user` y `curriculum_${user.id}`)
- Retorna un objeto con el resultado de la operación

**Código relevante:**
```javascript
const deleteAccount = () => {
  if (user) {
    setUser(null);
    localStorage.removeItem('laboria_user');
    localStorage.removeItem(`curriculum_${user.id}`);
    return { success: true };
  }
  return { success: false, error: 'No hay usuario autenticado' };
};
```

### 2. Componente EditProfileModal

Se creó un nuevo componente reutilizable en `src/components/EditProfileModal.jsx` que permite editar la información del perfil:

**Características:**
- Formulario adaptativo según el tipo de usuario (candidato o empresa)
- Validación de campos obligatorios
- Validación de formato de email
- Campos específicos para candidatos:
  - Nombre, apellido, email, teléfono, ubicación
  - Experiencia, expectativa salarial, preferencia de trabajo
  - Biografía, LinkedIn, GitHub, Portfolio
- Campos específicos para empresas:
  - Nombre de empresa, email, teléfono, ubicación
  - Industria, tamaño, sitio web
  - Descripción, enfoque (empleados/estudiantes/híbrido)

**Validaciones implementadas:**
- Email obligatorio y con formato válido
- Nombre y apellido obligatorios para candidatos
- Nombre de empresa e industria obligatorios para empresas

### 3. Integración en Páginas de Perfil

Se actualizaron ambas páginas de perfil para incluir la funcionalidad:

**CandidateProfilePage.jsx:**
- Importación de `EditProfileModal` y `useNavigate`
- Estado para controlar los modales de edición y eliminación
- Botón "Editar Perfil" funcional que abre el modal
- Botón "Eliminar Cuenta" con confirmación
- Modal de confirmación de eliminación con advertencia de irreversibilidad

**CompanyProfilePage.jsx:**
- Mismas funcionalidades que CandidateProfilePage
- Adaptado para el tipo de usuario empresa

### 4. Estilos

Se crearon estilos en `src/components/EditProfileModal.css`:
- Modal con overlay oscuro
- Diseño responsivo
- Colores negro y dorado (coherente con el tema de la aplicación)
- Animaciones suaves
- Scroll personalizado para el modal
- Estilos para formularios, inputs, textareas y selects
- Estilos para mensajes de error
- Estilos para botones (primario, secundario, peligro)

Se actualizó `src/pages/perfiles/ProfilePage.css`:
- Estilo especial para el botón "Eliminar Cuenta" con borde rojo
- Hover effect con fondo rojo para indicar acción destructiva

## Archivos Modificados

1. `src/context/AuthContext.jsx` - Agregada función `deleteAccount`
2. `src/pages/perfiles/CandidateProfilePage.jsx` - Integración de modales
3. `src/pages/perfiles/CompanyProfilePage.jsx` - Integración de modales
4. `src/pages/perfiles/ProfilePage.css` - Estilos para botón eliminar
5. `src/components/EditProfileModal.jsx` - Nuevo componente (creado)
6. `src/components/EditProfileModal.css` - Nuevos estilos (creado)

## Impacto de la Mejora

### UX (Experiencia de Usuario)
- Los usuarios ahora pueden actualizar su información de perfil fácilmente
- La eliminación de cuenta tiene una confirmación de seguridad para evitar eliminaciones accidentales
- Interfaz intuitiva con modales claros y validaciones en tiempo real
- Feedback visual claro para acciones destructivas (botón rojo para eliminar)

### Mantenibilidad
- Componente `EditProfileModal` reutilizable para ambos tipos de usuario
- Lógica de validación centralizada en el componente
- Función `deleteAccount` centralizada en AuthContext
- Separación clara de responsabilidades

### Seguridad
- Confirmación explícita antes de eliminar cuenta
- Advertencia sobre la irreversibilidad de la acción
- Validación de datos antes de guardar cambios
- Limpieza completa de datos del localStorage al eliminar cuenta

### Performance
- Uso eficiente de localStorage para persistencia
- Actualización optimizada del estado de usuario
- Sin llamadas a API (implementación frontend como requerido)

## Notas Importantes

- La implementación es puramente frontend, sin backend
- En un entorno de producción, la eliminación de cuenta debería incluir una llamada a API para eliminar datos del servidor
- La función `updateProfile` ya existía en AuthContext y se reutilizó para la edición de perfiles
- Los estilos mantienen la coherencia con el tema negro + dorado de la aplicación
