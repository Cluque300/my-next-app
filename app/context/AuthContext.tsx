// app/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  id: number;
  fullname: string;
  fulllastname: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  foto?: string; // URL de la foto de perfil (opcional)
}

interface AuthContextType {
  isLoggedIn: boolean | null;
  userId: number | null;
  userRole: 'USER' | 'ADMIN' | null;
  userData: UserData | null; // Nueva propiedad para almacenar datos del usuario
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isCurrentUser: (id: number) => boolean;
  setLoading: (loading: boolean) => void; // Método para actualizar el estado de carga
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<'USER' | 'ADMIN' | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); // Nuevo estado
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkUserSession = async () => {
    try {
      const response = await fetch('/api/autch/check-session', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);
      setUserId(data.userId !== undefined ? data.userId : null);
      setUserRole(data.userRole || null);
      setUserData(data.userData || null); // Actualiza la información del usuario
    } catch (error) {
      console.error('Error verificando la sesión:', error);
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole(null);
      setUserData(null); // Resetear los datos del usuario
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch('/api/autch/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(true);
      setUserId(data.userId);
      setUserRole(data.userRole);
      setUserData(data.userData); // Guardar la información del usuario después de iniciar sesión
      await checkUserSession();
      router.push(data.redirectUrl);
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    const response = await fetch('/api/autch/logout', {
      method: 'POST',
    });

    if (response.ok) {
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole(null);
      setUserData(null); // Resetear los datos del usuario
      router.push('/login');
    } else {
      console.error('Error al cerrar sesión');
    }
  };

  const isCurrentUser = (id: number) => {
    return userId === id;
  };

  // Función para actualizar el estado de carga
  const setLoadingState = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userRole, userData, loading, login, logout, isCurrentUser, setLoading: setLoadingState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
