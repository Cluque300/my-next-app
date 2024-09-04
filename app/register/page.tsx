'use client';

import React, { useState } from 'react';
import styles from './register.module.css';
import Image from 'next/image';

const RegisterPage: React.FC = () => {
  const [fullname, setFullname] = useState('');
  const [fulllastname, setFullLastname] = useState(''); // Renombrado para evitar conflicto
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, fulllastname, email, username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('¡Registro completado con éxito!');
        setError('');
      } else {
        setError(result.message || 'Error en el registro');
        setSuccess('');
      }
    } catch (err) {
      setError('Error del servidor');
      setSuccess('');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.logo}>
        <Image src="/images/isotipohb.svg" alt="Logo" width={100} height={100} />
      </div>
      <h1 className={styles.title}>Crear una Cuenta</h1>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="fullname" className={styles.label}>Nombre Completo</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          className={styles.input}
        />
        <label htmlFor="fulllastname" className={styles.label}>Apellido Completo</label>
        <input
          type="text"
          id="fulllastname"
          value={fulllastname}
          onChange={(e) => setFullLastname(e.target.value)}
          required
          className={styles.input}
        />
        <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <label htmlFor="username" className={styles.label}>Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <label htmlFor="confirm_password" className={styles.label}>Confirmar Contraseña</label>
        <input
          type="password"
          id="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Registrarse</button>
        <div className={styles.bottom}>
          <span>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

