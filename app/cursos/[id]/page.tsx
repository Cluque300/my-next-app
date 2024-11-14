"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress, Paper, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Curso {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_inicio: string;
  fecha_fin: string;
  inscrito?: boolean;
}

export default function CursoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { userId } = useAuth();
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurso = async () => {
      const response = await fetch(`/api/autch/cursos/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCurso({
          ...data,
          inscrito: data.inscripcion.some((i: any) => i.userId === userId),
        });
      } else {
        console.error('Error fetching curso data');
      }
      setLoading(false);
    };

    fetchCurso();
  }, [params.id, userId]);

  const handleInscripcion = async () => {
    if (!userId) {
      console.error('El usuario no está autenticado');
      return;
    }

    const response = await fetch(`/api/autch/cursos/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      alert('Inscripción exitosa');
      setCurso((prevCurso) => prevCurso ? { ...prevCurso, inscrito: true } : prevCurso);
    } else {
      console.error('Error al inscribirse en el curso');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!curso) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">Error al cargar el curso.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ padding: 4, mt: 6, borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" color="primary" gutterBottom>
            {curso.nombre}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {curso.descripcion || 'Este curso no tiene descripción.'}
          </Typography>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Fecha de Inicio:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {new Date(curso.fecha_inicio).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Fecha de Fin:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {new Date(curso.fecha_fin).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={3}>
          {curso.inscrito ? (
            <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
              Inscrito con éxito
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleInscripcion}
              sx={{ width: '100%', maxWidth: 250, fontWeight: 'bold', borderRadius: 2 }}
            >
              Inscribirse
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
