// app/layout.tsx

import React from 'react';
import SearchBar from './components/searchbar'; // Asegúrate de que la ruta es correcta
import './globals.css'; // Incluye tus estilos globales

export const metadata = {
  title: 'Mi Aplicación',
  description: 'Descripción de mi aplicación',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es"> {/* La etiqueta <html> con el atributo lang */}
      <body>
        <header>
          <h1>Mi Aplicación</h1>
          <SearchBar /> {/* Aquí está la barra de búsqueda */}
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 Carlos?Luque</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;






