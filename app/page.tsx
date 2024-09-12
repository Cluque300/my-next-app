// app/page.tsx
import React from 'react';
import Link from 'next/link';
import SearchBar from './components/searchbar'; // Asegúrate de que la ruta es correcta
import styles from './homepage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bienvenido a Mi Aplicación</h1>
      </header>
      <main className={styles.mainContent}>
        <p className={styles.description}>
          Esta es la página de inicio. Puedes buscar en la barra de búsqueda a continuación.
        </p>
        <SearchBar /> {/* Agrega el componente SearchBar */}
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link href="/register">Registrar</Link>
            </li>
            <li>
              <Link href="/users">Usuarios</Link>
            </li>
          </ul>
        </nav>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;

