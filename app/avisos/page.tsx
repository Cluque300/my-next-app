// app/avisos/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Asegúrate de tener un contexto de autenticación que maneje el userId
import { CircularProgress, Container, Grid, Typography, Button } from '@mui/material';
import AvisoCard from '../components/AvisoCard';
import Link from 'next/link';

interface Aviso {
  id: number;
  description: string;
  date: string;
}

export default function Avisos() {
  const { userId } = useAuth(); // Obtiene el userId del contexto
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchAvisos = async () => {
      if (!userId) return; // No hacer la llamada si no hay userId

      try {
        const response = await fetch(`/api/autch/avisos?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los avisos');
        }
        const data = await response.json();
        setAvisos(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching avisos:', error.message);
          setError(error.message); // Manejar el error
        } else {
          console.error('Error fetching avisos:', error);
          setError('Error desconocido'); // Manejar el caso de error desconocido
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAvisos();
  }, [userId]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/autch/avisos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el aviso');
      }
      setAvisos(prevAvisos => prevAvisos.filter(aviso => aviso.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting aviso:', error.message);
        setError(error.message); // Manejar el error
      } else {
        console.error('Error deleting aviso:', error);
        setError('Error desconocido'); // Manejar el caso de error desconocido
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>Cargando avisos...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Mis Avisos</Typography>
      <Button 
        variant="contained" 
        component={Link} 
        href="/avisos/create"
        sx={{ marginBottom: 2 }}
      >
        Crear Aviso
      </Button>
      <Grid container spacing={3}>
        {avisos.map(aviso => (
          <Grid item xs={12} sm={6} md={4} key={aviso.id}>
            <AvisoCard 
              description={aviso.description} 
              date={aviso.date} 
              onDelete={() => handleDelete(aviso.id)} // Pasar la función de eliminar
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
