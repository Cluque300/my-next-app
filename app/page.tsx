// app/page.tsx
// app/page.tsx
import React from 'react';
import Link from 'next/link';
import SearchBar from './components/searchbar'; // Asegúrate de que la ruta es correcta
import styles from './homepage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img src="/images/isotipohb.svg" alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Human Bionics</h1>
        </div>
        <nav className={styles.navbar}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Menú</button>
            <div className={styles.dropdownContent}>
              <Link href="/page1">Página 1</Link>
              <Link href="/page2">Página 2</Link>
              <Link href="/page3">Página 3</Link>
            </div>
          </div>
          <div className={styles.searchContainer}>
            <SearchBar /> {/* Barra de búsqueda */}
          </div>
          <div className={styles.authButtons}>
            <Link href="/login">
              <button className={styles.authButton}>Iniciar sesión</button>
            </Link>
            <Link href="/register">
              <button className={styles.authButton}>Registrarse</button>
            </Link>
          </div>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <p className={styles.description}>
          Esta es la página de inicio. Puedes buscar en la barra de búsqueda a continuación.
        </p>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
        <img src="/images/isotipo2.jpg" alt="Logo Alternativo" className={styles.footerLogo} />
      </footer>
    </div>
  );
};

export default HomePage;










