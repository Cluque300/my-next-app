// app/about/page.tsx

import React from 'react';
import styles from './aboutpage.module.css'; // Actualiza la importación del archivo CSS

const AboutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src="/images/about.jpg" alt="Sobre Nosotros" className={styles.image} />
      <p className={styles.description}>
        Bienvenido a la página de "Sobre Nosotros". Aquí encontrarás información sobre nuestra empresa, nuestro equipo y nuestra misión.
      </p>
      <a href="/" className={styles.link}>Volver a la página principal</a>
    </div>
  );
};

export default AboutPage;









