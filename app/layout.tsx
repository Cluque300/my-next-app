// app/layout.tsx
"use client";

import { ReactNode } from 'react';
import './globals.css'; // Incluye tus estilos globales
import { usePathname } from 'next/navigation'; // Importa usePathname

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body>
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
                  <li><a href="/users">Users</a></li>
                </ul>
              </nav>
            </header>
          )}
          <main className="main-content">
            {children}
          </main>
          {!isHomePage && (
            <footer className="footer">
              <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
            </footer>
          )}
        </div>
      </body>
    </html>
  );
}

