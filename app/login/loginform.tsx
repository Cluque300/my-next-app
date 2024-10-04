'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './login.module.css';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto de autenticación

export default function LoginForm() {
  const { login } = useAuth(); // Usamos el hook para acceder a la función login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const router = useRouter(); // Hook de redirección

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores al enviar

    try {
      await login(username, password); // Llamamos a la función login del contexto
      // La redirección se maneja dentro del login, no necesitamos hacerlo aquí
    } catch (error) {
      setError('Error al iniciar sesión'); // Mostrar error en el formulario
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



