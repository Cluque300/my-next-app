'use client'; // Marca este archivo como Client Component

import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './aboutpage.module.css';

const AboutPage = () => {
  useEffect(() => {
    console.log('Component mounted');
    
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre Nosotros</h1>
      <p>Esta es la página de About.</p>
      <Image 
        src="/images/about.jpg"  // Ruta a la imagen en la carpeta `public`
        alt="Descripción de la imagen"
        width={600} // Ajusta el ancho según sea necesario
        height={400} // Ajusta la altura según sea necesario
        className={styles.image} // Aplica estilos CSS si es necesario
      />
      <a href="/" className={styles.link}>
        Regresar a la Página Principal
      </a>
    </div>
  );
};

export default AboutPage;







