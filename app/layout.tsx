// app/layout.tsx

import { ReactNode } from 'react';
import './globals.css'; // Incluye tus estilos globales

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <header>
          {/* Aquí puedes agregar tu barra de navegación o cualquier otro contenido global */}
          <nav>
            {/* Ejemplo de navegación */}
            <a href="/">Home</a>
            <a href="/about">About</a>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>
          {/* Aquí puedes agregar el pie de página */}
          <p>Footer content</p>
        </footer>
      </body>
    </html>
  );
}

