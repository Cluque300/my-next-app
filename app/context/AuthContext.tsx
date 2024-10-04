// app/context/AuthContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importa el hook useRouter

// Definimos la interfaz para el tipo del contexto de autenticación
interface AuthContextType {
  isLoggedIn: boolean | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creamos el componente proveedor que envolverá la aplicación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter(); // Inicializamos el hook useRouter para la navegación

  useEffect(() => {
    // Función que chequea si hay una sesión de usuario activa al cargar la app
    const checkUserSession = async () => {
      try {
        const response = await fetch('/api/autch/check-session'); // Revisa la sesión
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn); // Actualiza el estado según la respuesta
      } catch (error) {
        console.error('Error verificando la sesión:', error);
        setIsLoggedIn(false); // En caso de error, se asume que no está autenticado
      }
    };
    checkUserSession(); // Se ejecuta al montar el componente
  }, []);

  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
    const response = await fetch('/api/autch/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Enviamos las credenciales
    });

    if (response.ok) {
      const data = await response.json(); // Obtenemos la respuesta del servidor
      setIsLoggedIn(true); // Actualizamos el estado de autenticación
      router.push(data.redirectUrl); // Redirigimos a la URL obtenida
    } else {
      throw new Error('Login failed'); // Si el login falla, lanzamos un error
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    const response = await fetch('/api/autch/logout', {
      method: 'POST',
    });

    if (response.ok) {
      document.cookie = 'user=; max-age=0; path=/'; // Limpiamos las cookies de usuario
      setIsLoggedIn(false); // Actualizamos el estado de autenticación
      router.push('/login'); // Redirigimos a la página de login
    } else {
      console.error('Error al cerrar sesión'); // Si falla el logout, mostramos un error
    }
  };

  // Renderizamos el proveedor del contexto con el estado y las funciones
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children} {/* Renderizamos los hijos dentro del proveedor */}
    </AuthContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto de autenticación en cualquier componente
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider'); // Si no estamos dentro del proveedor, lanzamos un error
  }
  return context;
};
