'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

interface Certificado {
  id_certificado: number; 
  nombre_certificado: string;
  fecha_subida: string; 
  archivo_certificado: string; 
}

export default function CertificadoDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [certificado, setCertificado] = useState<Certificado | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCertificado = async () => {
      try {
        const response = await axios.get(`/api/autch/certificados/${id}`);
        setCertificado(response.data);
      } catch (error) {
        console.error('Error obteniendo el certificado:', error);
        setError('Hubo un error al obtener el certificado. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificado();
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

  if (!certificado) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography align="center">No se encontró el certificado.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {certificado.nombre_certificado}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Fecha de subida: {new Date(certificado.fecha_subida).toLocaleDateString()}
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              onClick={() => window.open(certificado.archivo_certificado, '_blank')}
            >
              Descargar Certificado
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
