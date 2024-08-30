"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Simulación de validación de credenciales
    if (email === 'user@example.com' && password === 'password') {
      router.push('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />
      
      <label htmlFor="password" className={styles.label}>Contraseña</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      
      <button type="submit" className={styles.button}>Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
