"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que esta ruta sea correcta
import styles from './create.module.css'; // Crea este archivo CSS si es necesario

export default function CreateAviso() {
  const { userId } = useAuth(); // Obtén el userId del contexto
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/autch/avisos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, date, userId }), // Incluye userId al crear el aviso
      });

      if (!response.ok) {
        throw new Error('Error al crear el aviso');
      }

      // Reinicia el formulario
      setDescription('');
      setDate('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Asegúrate de que error sea de tipo Error
      } else {
        setError('Error desconocido'); // Mensaje de error por defecto
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Crear Aviso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Aviso'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
