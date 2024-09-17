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
        {!isHomePage && (
          <header>
            {/* Aquí puedes agregar tu barra de navegación o cualquier otro contenido global */}
            <nav>
              {/* Ejemplo de navegación */}
              <a href="/">Home</a>
              <a href="/about">About</a>
            </nav>
          </header>
        )}
        <main>
          {children}
        </main>
        {!isHomePage && (
          <footer>
            {/* Aquí puedes agregar el pie de página */}
            <p>Footer content</p>
          </footer>
        )}
      </body>
    </html>
  );
}


