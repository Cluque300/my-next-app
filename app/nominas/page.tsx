'use client';

import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

interface Nomina {
  id_nomina: number; 
  nombre_nomina: string;
  fecha_subida: string; 
  archivo_nomina: string; 
}

export default function NominasPage() {
  const [nominas, setNominas] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNominas = async () => {
      try {
        const response = await axios.get('/api/autch/nominas');
        setNominas(response.data);
      } catch (error) {
        console.error('Error obteniendo nóminas:', error);
        setError('Hubo un error al obtener las nóminas. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNominas();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nóminas
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : nominas.length === 0 ? (
        <Typography align="center">No hay nóminas disponibles.</Typography>
      ) : (
        <Grid container spacing={3}>
          {nominas.map(nomina => (
            <Grid item xs={12} key={nomina.id_nomina}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{nomina.nombre_nomina}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Fecha de subida: {new Date(nomina.fecha_subida).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => window.open(nomina.archivo_nomina, '_blank')}
                    sx={{ mt: 2 }}
                  >
                    Descargar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
