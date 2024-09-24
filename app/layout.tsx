// app/layout.tsx
"use client";

import { ReactNode, useEffect, useState } from 'react';
import './globals.css';
import { usePathname } from 'next/navigation';
import LogoutButton from './components/logoutbutton';
import { AuthProvider } from './context/AuthContext';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkUserSession = async () => {
    try {
      const response = await fetch('/api/autch/check-session');
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);
    } catch (error) {
      console.error('Error verificando la sesión:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>MyApp</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AuthProvider>
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
                    {isLoggedIn === true ? (
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
              {isLoggedIn === null ? <div>Cargando...</div> : children}
            </main>
            {!isHomePage && (
              <footer className="footer">
                <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
              </footer>
            )}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

