// app/components/Header.tsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import UserMenu from './UserMenu'; // Importa el UserMenu desde la ubicación correcta
import styles from './header.module.css';
import MenuIcon from '@mui/icons-material/Menu'; // Importa el ícono de menú
import IconButton from '@mui/material/IconButton'; // Botón con ícono

interface HeaderProps {
  onDrawerToggle: () => void; // Recibe una función para manejar el toggle del drawer
}

export default function Header({ onDrawerToggle }: HeaderProps) {
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
        {/* Contenedor del logo */}
        <div className={styles.logoContainer}>
          <Link href="/">
            <img
              src="/images/logo_blanco.png"
              alt="HumanBionics Logo"
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Botón para abrir el drawer en móviles */}
        <div className={styles.menuButton}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onDrawerToggle} // Llama al handler que abre el drawer
            sx={{ display: { xs: 'block', sm: 'none' } }} // Sólo visible en móviles
          >
            <MenuIcon />
          </IconButton>
        </div>

        {/* Opciones de navegación */}
        <ul className={styles.navLinks}>
          {isLoggedIn === null ? (
            <li>Cargando...</li>
          ) : isLoggedIn ? (
            <li>
              <UserMenu userId={userId} /> {/* Pasa el userId a UserMenu */}
            </li>
          ) : (
            <li>
              <Link href="/login">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
