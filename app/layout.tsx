// app/layout.tsx
"use client";

import { ReactNode } from 'react';
import './globals.css'; // Mantiene los estilos globales
import Header from './components/Header'; // Importamos el nuevo Header
import { AuthProvider } from './context/AuthContext';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <div className="layout-container">
            <Header /> {/* El header ahora se importa aquí */}
            <main className="main-content">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
