// app/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './homepage.module.css';

const HomePage = () => {
  return (
    <main>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Página Principal</h1>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/homepage-image.jpg" 
            alt="Descripción de la imagen"
            width={500} 
            height={300} 
            layout="responsive" 
          />
        </div>
        <p>Bienvenido a la página principal.</p>
        <div className={styles.linkContainer}>
          <Link href="/about" className={styles.link}>
            Acerca de nosotros
          </Link>
          <Link href="/login" className={styles.link}>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;







