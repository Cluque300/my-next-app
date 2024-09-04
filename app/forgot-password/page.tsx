// Añade esta línea al inicio del archivo para marcarlo como un componente de cliente
'use client';

import React, { useState } from 'react';
import styles from './forgot-password.module.css';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    console.log('Email:', email);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Recuperar Contraseña</h1>
      <p className={styles.description}>
        Por favor, ingrese su dirección de correo electrónico para recibir instrucciones sobre cómo restablecer su contraseña.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Restablecer Contraseña</button>
        <div className={styles.bottom}>
          <a href="/login">Volver al inicio de sesión</a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;


