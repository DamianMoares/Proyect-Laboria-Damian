# Implementación de Sistema de Autenticación y Perfiles Multi-Rol

## Problema Detectado

El proyecto Laboria-V2 carecía de sistema de autenticación y gestión de perfiles, lo que impedía:
1. Que los usuarios pudieran registrarse y guardar sus preferencias.
2. Que las empresas pudieran publicar ofertas de empleo y cursos.
3. Que los candidatos pudieran gestionar su perfil profesional.
4. Diferenciación entre tipos de usuarios (candidatos, empresas de empleados, empresas de estudiantes, empresas híbridas).

## Solución Implementada

Se ha implementado un sistema completo de autenticación y perfiles multi-rol:

1. **AuthContext**: Contexto de React para gestión de estado de autenticación con localStorage.
2. **Sistema de roles**: 4 tipos de usuarios (candidate, company_employees, company_students, company_hybrid).
3. **LoginPage**: Formulario de login con redirección según rol.
4. **RegisterPage**: Registro en 2 pasos con selección de rol y formularios específicos.
5. **CandidateProfilePage**: Perfil de candidato con información personal, skills y enlaces.
6. **CompanyProfilePage**: Perfil de empresa unificado que adapta contenido según rol.
7. **Navbar dinámico**: Muestra botones de login/registro o perfil/cerrar sesión según estado.
8. **Datos mock**: 5 usuarios de ejemplo con diferentes roles.

## Archivos Modificados/Creados

### Datos
- `src/data/users.json` - 5 usuarios mock con roles: candidate, company_employees, company_students, company_hybrid.

### Contexto
- `src/context/AuthContext.jsx` - AuthProvider con login, register, logout, updateProfile y helpers de rol.

### Páginas de Autenticación
- `src/pages/LoginPage.jsx` + `.css` - Formulario de login con cuentas demo.
- `src/pages/RegisterPage.jsx` + `.css` - Registro en 2 pasos con selección de rol y formularios específicos.

### Páginas de Perfil
- `src/pages/CandidateProfilePage.jsx` - Perfil de candidato con skills, biografía y enlaces.
- `src/pages/CompanyProfilePage.jsx` - Perfil de empresa unificado con ofertas/cursos publicados.
- `src/pages/ProfilePage.css` - Estilos compartidos para páginas de perfil.

### Configuración
- `src/App.jsx` - Navbar componentizado, AuthProvider envolviendo app, rutas de auth.
- `src/App.css` - Estilos para botones de autenticación en navbar.

## Código Relevente

### AuthContext.jsx (gestión de autenticación)
```jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const foundUser = usersData.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('laboria_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Credenciales inválidas' };
  };

  const isCandidate = () => user?.role === 'candidate';
  const isCompanyHybrid = () => user?.role === 'company_hybrid';
  const isAnyCompany = () => isCompanyEmployees() || isCompanyStudents() || isCompanyHybrid();
};
```

### users.json (estructura de roles)
```json
{
  "id": 1,
  "email": "candidato@test.com",
  "role": "candidate",
  "profile": {
    "firstName": "Juan",
    "skills": ["React", "JavaScript"],
    "experience": "3-5 años"
  }
},
{
  "id": 4,
  "email": "empresa-hibrida@test.com",
  "role": "company_hybrid",
  "profile": {
    "companyName": "Innovate Solutions",
    "focus": "híbrido",
    "postedJobs": [3, 4],
    "postedCourses": [3, 4]
  }
}
```

### RegisterPage.jsx (selección de rol)
```jsx
const handleRoleSelect = (selectedRole) => {
  setRole(selectedRole);
  setStep(2);
};

<div className="role-cards">
  <div onClick={() => handleRoleSelect('candidate')}>
    <h3>Candidato</h3>
    <p>Busco empleo y formación</p>
  </div>
  <div onClick={() => handleRoleSelect('company_hybrid')}>
    <h3>Empresa (Híbrida)</h3>
    <p>Busco tanto empleados como estudiantes</p>
  </div>
</div>
```

### CompanyProfilePage.jsx (adaptación según rol)
```jsx
const { isCompanyEmployees, isCompanyStudents, isCompanyHybrid } = useAuth();
const focus = profile.focus || '';

{(isCompanyEmployees() || isCompanyHybrid()) && (
  <section>
    <h2>Ofertas de Empleo Publicadas</h2>
    {postedJobs.map(job => <Link to={`/empleos/${job.id}`}>{job.title}</Link>)}
  </section>
)}

{(isCompanyStudents() || isCompanyHybrid()) && (
  <section>
    <h2>Cursos Publicados</h2>
    {postedCourses.map(course => <Link to={`/cursos/${course.id}`}>{course.title}</Link>)}
  </section>
)}
```

### App.jsx (navbar dinámico)
```jsx
function Navbar() {
  const { isAuthenticated, logout, isCandidate, isAnyCompany } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {isAuthenticated ? (
          <>
            <li><button onClick={handleProfileClick}>Mi Perfil</button></li>
            <li><button onClick={logout}>Cerrar Sesión</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/perfil/candidato" element={<CandidateProfilePage />} />
          <Route path="/perfil/empresa" element={<CompanyProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

## Impacto de la Mejora

### UX
- **Autenticación fluida**: Login/registro con redirección automática según rol.
- **Perfiles personalizados**: Cada tipo de usuario tiene interfaz adaptada a sus necesidades.
- **Navbar dinámico**: Botones cambian según estado de autenticación.
- **Cuentas demo**: Facilita testing con credenciales predefinidas.

### Mantenibilidad
- **AuthContext centralizado**: Lógica de autenticación en un solo lugar.
- **Helpers de rol**: Funciones reutilizables para verificar tipo de usuario.
- **Componentes modulares**: LoginPage, RegisterPage y perfiles separados.
- **Datos mock estructurados**: Estructura clara para migración a API real.

### Escalabilidad
- **Sistema de roles extensible**: Fácil añadir nuevos roles.
- **CompanyProfile unificado**: Un componente maneja 3 tipos de empresa.
- **LocalStorage persistente**: Sesión mantiene tras recarga.
- **Rutas protegidas**: Preparado para implementar ProtectedRoute.

### Seguridad (Frontend)
- **Validación de contraseñas**: Mínimo 6 caracteres y coincidencia.
- **Persistencia en localStorage**: Sesión mantiene entre recargas.
- **Separación de password**: Password eliminado antes de guardar en estado.
- **Redirección por rol**: Usuarios solo acceden a sus páginas correspondientes.

## Próximos Pasos Sugeridos

1. Implementar ProtectedRoute component para rutas protegidas.
2. Añadir edición de perfil con formulario.
3. Implementar publicación de ofertas/cursos para empresas.
4. Añadir sistema de favoritos para candidatos.
5. Implementar validación de email real.
6. Añadir recuperación de contraseña.
7. Integrar con backend real para autenticación.
8. Añadir avatares personalizados.
9. Implementar notificaciones (alertas por email).
10. Añadir historial de aplicaciones para candidatos.
