'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './login.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const router = useRouter(); // Hook de redirección

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores al enviar

    const response = await fetch('/api/autch/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push(data.redirectUrl); // Redirigir usando useRouter
    } else {
      const error = await response.json();
      setError(error.message); // Mostrar error en el formulario
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formAuthSmall}>
      {error && <div className={styles.error}>{error}</div>} {/* Mostrar error */}
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



