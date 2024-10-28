"use client";

import { ReactNode } from 'react';
import './globals.css'; // Mantiene los estilos globales
import Header from './components/Header'; // Importamos el Header
import ResponsiveDrawer from './components/ResponsiveDrawer'; // Drawer para el layout
import { AuthProvider, useAuth } from './context/AuthContext'; // Importa el AuthProvider y useAuth
import { CircularProgress } from '@mui/material';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <AuthProvider>
        <body>
          <div className="layout-container">
            <Header />
            <LayoutContent>{children}</LayoutContent>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useAuth(); // Obtener el estado de autenticación

  if (loading) {
    return <CircularProgress />; // Mostrar un indicador de carga mientras se verifica la sesión
  }

  return isLoggedIn ? (
    <div className="drawer-open">
      <ResponsiveDrawer>{children}</ResponsiveDrawer>
    </div>
  ) : (
    <main className="main-content">{children}</main>
  );
}
