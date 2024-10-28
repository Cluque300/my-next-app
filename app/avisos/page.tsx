// app/avisos/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Container, Grid, Typography, Button, Alert, Box } from '@mui/material';
import AvisoCard from '../components/AvisoCard';
import Link from 'next/link';

interface Aviso {
  id: number;
  description: string;
  date: string;
}

export default function Avisos() {
  const { userId } = useAuth();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvisos = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/autch/avisos?userId=${userId}`);
        if (!response.ok) throw new Error('Error al obtener los avisos');

        const data = await response.json();
        setAvisos(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else setError('Error desconocido');
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
      if (!response.ok) throw new Error('Error al eliminar el aviso');
      setAvisos(prevAvisos => prevAvisos.filter(aviso => aviso.id !== id));
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError('Error desconocido');
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

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Mis Avisos
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/avisos/create"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Crear Aviso
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {avisos.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          No tienes avisos registrados.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {avisos.map(aviso => (
            <Grid item xs={12} sm={6} md={4} key={aviso.id}>
              <AvisoCard
                description={aviso.description}
                date={aviso.date}
                onDelete={() => handleDelete(aviso.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
