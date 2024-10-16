// app/layout.tsx
"use client";

import { ReactNode } from 'react';
import './globals.css'; // Mantiene los estilos globales
import Header from './components/Header'; // Importamos el Header
import ResponsiveDrawer from './components/ResponsiveDrawer'; // Drawer para el layout
import { AuthProvider, useAuth } from './context/AuthContext'; // Importa el AuthProvider y useAuth

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body>
        <AuthProvider> {/* Envuelve toda la aplicación con el AuthProvider */}
          <div className="layout-container">
            <Header /> {/* El Header se muestra en todas las rutas */}
            <LayoutContent>{children}</LayoutContent> {/* Controla el contenido del layout */}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth(); // Obtener el estado de autenticación

  return isLoggedIn ? (
    <ResponsiveDrawer>{children}</ResponsiveDrawer> // Si el usuario está autenticado, se muestra el Drawer
  ) : (
    <main className="main-content">{children}</main> // Si no está autenticado, se muestra el contenido como siempre
  );
}
