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
      <AuthProvider> {/* Mueve el AuthProvider para envolver todo */}
        <body> {/* Ya no usamos una clase condicional aquí */}
          <div className="layout-container">
            <Header /> {/* El Header se muestra en todas las rutas */}
            <LayoutContent>{children}</LayoutContent> {/* Controla el contenido del layout */}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth(); // Obtener el estado de autenticación

  return isLoggedIn ? (
    <div className="drawer-open"> {/* Aplicar la clase drawer-open solo si el usuario está autenticado */}
      <ResponsiveDrawer>{children}</ResponsiveDrawer> {/* Si el usuario está autenticado, se muestra el Drawer */}
    </div>
  ) : (
    <main className="main-content">{children}</main> // Si no está autenticado, se muestra el contenido sin drawer
  );
}
