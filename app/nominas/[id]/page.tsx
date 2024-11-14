'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, Paper, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

// Define la interfaz para los detalles de la nómina
interface Nomina {
  id_nomina: number;
  nombre_nomina: string;
  archivo_nomina?: string | null; // El archivo puede ser opcional
}

const NominaDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [nomina, setNomina] = useState<Nomina | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNomina = async () => {
      try {
        const response = await axios.get(`/api/autch/nominas/${id}`);
        setNomina(response.data);
      } catch (error) {
        console.error('Error fetching nomina:', error);
      }
    };

    fetchNomina();
  }, [id]);

  if (!nomina) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="text.secondary">Cargando...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Detalles de la Nómina
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary', mb: 1.5 }}>
          Nombre de la Nómina
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {nomina.nombre_nomina || 'Sin nombre'}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary', mb: 1.5 }}>
          Estado
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {nomina.archivo_nomina ? 'Disponible para descarga' : 'Pendiente'}
        </Typography>

        {nomina.archivo_nomina ? (
          <Button
            variant="contained"
            color="success"
            href={nomina.archivo_nomina}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            sx={{ fontWeight: 'bold', py: 1.5, mb: 2 }}
          >
            Descargar Nómina
          </Button>
        ) : (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            La nómina aún no está disponible para descargar.
          </Typography>
        )}

        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.back()}
          fullWidth
          sx={{ fontWeight: 'bold', py: 1.5 }}
        >
          Volver al Listado
        </Button>
      </Paper>
    </Container>
  );
};

export default NominaDetailPage;
