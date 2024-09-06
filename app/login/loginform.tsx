'use client';

import { useState } from 'react';
import styles from './login.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.redirectUrl; // Redirige al usuario a la URL especificada en la respuesta
    } else {
      const error = await response.json();
      alert(error.message); // O manejar el error de otra manera
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formAuthSmall}>
      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>Nombre de usuario</label>
        <input 
          type="text" 
          id="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.button}>Iniciar sesión</button>
      </div>
      <div className={styles.linkGroup}>
        <a href="/register">Registrarse</a>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
    </form>
  );
}





