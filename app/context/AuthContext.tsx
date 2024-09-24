// app/context/AuthContext.tsx

"use client"; // Asegúrate de que este archivo sea un componente del cliente

import React, { createContext, useContext, useState, useEffect } from 'react';
import { cookies } from 'next/headers'; // Importar para acceder a las cookies en el servidor

interface AuthContextType {
  isLoggedIn: boolean; // Cambiado de isAuthenticated a isLoggedIn
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>; // Cambiado a Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si hay una sesión activa a través de cookies
    const cookie = document.cookie.split('; ').find(row => row.startsWith('user='));
    if (cookie) {
      setIsLoggedIn(true); // Establecer estado a true si la cookie existe
    }
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
      document.cookie = `user=${data.token}; path=/`; // Almacena la cookie de sesión
      setIsLoggedIn(true);
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    const response = await fetch('/api/autch/logout', {
      method: 'POST',
    });

    if (response.ok) {
      setIsLoggedIn(false); // Cambia el estado a false
      document.cookie = "user=; max-age=0; path=/"; // Elimina la cookie
    } else {
      console.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
