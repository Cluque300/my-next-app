// app/layout.tsx
"use client";

import { ReactNode } from 'react';
import './globals.css';
import { usePathname } from 'next/navigation';
import LogoutButton from './components/logoutbutton';
import { AuthProvider, useAuth } from './context/AuthContext';

interface Props {
  children: ReactNode;
}

function LayoutContent({ children }: Props) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isLoggedIn } = useAuth();

  return (
    <div className="layout-container">
      {!isHomePage && (
        <header className="header">
          <nav className="nav">
            <div className="logo">
              <a href="/">
                <img src="/images/isotipohb.svg" alt="Logo" className="logo-image" />
              </a>
            </div>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              {isLoggedIn === null ? (
                <li>Cargando...</li>
              ) : isLoggedIn ? (
                <li>
                  <LogoutButton />
                </li>
              ) : (
                <li><a href="/login">Iniciar sesión</a></li>
              )}
            </ul>
          </nav>
        </header>
      )}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
