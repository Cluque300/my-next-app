"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que esta ruta sea correcta
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation'; // Importamos el router para redirigir

export default function CreateAviso() {
  const { userId } = useAuth(); // Obtén el userId del contexto
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Inicializamos el router

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

      // Redirige a /avisos tras crear exitosamente
      router.push('/avisos');
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
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Crear Aviso
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Descripción"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Crear Aviso'}
          </Button>
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}
        </Box>
      </form>
    </Container>
  );
}

