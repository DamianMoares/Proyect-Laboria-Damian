import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted user
    const storedUser = localStorage.getItem('laboria_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = usersData.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('laboria_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'Credenciales inválidas' };
  };

  const register = (userData) => {
    // Simulate registration - in real app this would call an API
    const newUser = {
      id: usersData.length + 1,
      ...userData,
      profile: userData.profile || {}
    };
    
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('laboria_user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('laboria_user');
  };

  const updateProfile = (profileData) => {
    if (user) {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profileData }
      };
      setUser(updatedUser);
      localStorage.setItem('laboria_user', JSON.stringify(updatedUser));
      return { success: true };
    }
    return { success: false, error: 'No hay usuario autenticado' };
  };

  const deleteAccount = () => {
    if (user) {
      setUser(null);
      localStorage.removeItem('laboria_user');
      localStorage.removeItem(`curriculum_${user.id}`);
      return { success: true };
    }
    return { success: false, error: 'No hay usuario autenticado' };
  };

  const isCandidate = () => user?.role === 'candidate';
  const isCompanyEmployees = () => user?.role === 'company_employees';
  const isCompanyStudents = () => user?.role === 'company_students';
  const isCompanyHybrid = () => user?.role === 'company_hybrid';
  const isAnyCompany = () => isCompanyEmployees() || isCompanyStudents() || isCompanyHybrid();

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
    isCandidate,
    isCompanyEmployees,
    isCompanyStudents,
    isCompanyHybrid,
    isAnyCompany,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
