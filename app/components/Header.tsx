// app/components/Header.tsx
"use client"; // Asegúrate de que esto esté presente si usas hooks de estado

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LogoutButton from './logoutbutton';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link'; // Importación de Link para navegación sin recarga
import styles from './header.module.css'; // Importamos el archivo de estilos CSS del header

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isLoggedIn } = useAuth();

  // Hook para depurar si el estado de autenticación está cambiando
  useEffect(() => {
    console.log('El estado de isLoggedIn cambió:', isLoggedIn);
  }, [isLoggedIn]);

  if (isHomePage) return null; // Si estamos en la homepage, no mostramos el header

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/isotipohb.svg" alt="Logo" className={styles.logoImage} />
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          {isLoggedIn === null ? (
            <li>Cargando...</li>
          ) : isLoggedIn ? (
            <li><LogoutButton /></li>
          ) : (
            <li><Link href="/login">Iniciar sesión</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

