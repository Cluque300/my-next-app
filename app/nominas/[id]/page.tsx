'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

interface Nomina {
  id_nomina: number; 
  nombre_nomina: string;
  fecha_subida: string; 
  archivo_nomina: string; 
}

export default function NominaDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [nomina, setNomina] = useState<Nomina | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchNomina = async () => {
      try {
        const response = await axios.get(`/api/autch/nominas/${id}`);
        setNomina(response.data);
      } catch (error) {
        console.error('Error obteniendo la nómina:', error);
        setError('Hubo un error al obtener la nómina. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNomina();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!nomina) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography align="center">No se encontró la nómina.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {nomina.nombre_nomina}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Fecha de subida: {new Date(nomina.fecha_subida).toLocaleDateString()}
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              onClick={() => window.open(nomina.archivo_nomina, '_blank')}
            >
              Descargar Nómina
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
