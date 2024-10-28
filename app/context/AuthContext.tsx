// app/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean | null;
  userId: number | null;
  userRole: 'USER' | 'ADMIN' | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<'USER' | 'ADMIN' | null>(null);
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
    } catch (error) {
      console.error('Error verificando la sesión:', error);
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole(null);
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
      router.push('/login');
    } else {
      console.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userRole, loading, login, logout }}>
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

