// app/components/Header.tsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import UserMenu from './UserMenu'; // Importa el UserMenu desde la ubicación correcta
import styles from './header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isLoggedIn, userId } = useAuth(); // Asegúrate de obtener userId aquí

  useEffect(() => {
    console.log('El estado de isLoggedIn cambió:', isLoggedIn);
  }, [isLoggedIn]);

  if (isHomePage) return null;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/images/isotipohb.svg" alt="Logo" className={styles.logoImage} />
          </Link>
          <span className={styles.companyName}>HumanBionics</span>
        </div>
        <ul className={styles.navLinks}>
          {isLoggedIn === null ? (
            <li>Cargando...</li>
          ) : isLoggedIn ? (
            <li><UserMenu userId={userId} /></li> // Pasa el userId a UserMenu
          ) : (
            <li><Link href="/login">Iniciar sesión</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}




