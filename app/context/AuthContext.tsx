// app/context/AuthContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean | null;
  userId: number | null; // Cambiado a number para reflejar el tipo de la base de datos
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch('/api/autch/check-session');
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUserId(data.userId !== undefined ? data.userId : null);
      } catch (error) {
        console.error('Error verificando la sesión:', error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    };
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
      setUserId(data.userId); // Se establece como number
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
      document.cookie = 'user=; max-age=0; path=/';
      setIsLoggedIn(false);
      setUserId(null);
      router.push('/login');
    } else {
      console.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
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
