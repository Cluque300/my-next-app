'use client';

import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Box, TextField, Divider } from '@mui/material';
import axios from 'axios';

interface Certificado {
  id_certificado: number; 
  nombre_certificado: string;
  usuario_sube_certificado: string;
  fecha_subida: string; 
  archivo_certificado: string; 
}

export default function CertificadosPage() {
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nombreCertificado, setNombreCertificado] = useState<string>('');
  const [solicitudEnProceso, setSolicitudEnProceso] = useState<boolean>(false);

  useEffect(() => {
    const fetchCertificados = async () => {
      try {
        const response = await axios.get('/api/autch/certificados');
        setCertificados(response.data);
      } catch (error) {
        console.error('Error obteniendo certificados:', error);
        setError('Hubo un error al obtener los certificados. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificados();
  }, []);

  const handleSolicitarCertificado = async () => {
    setSolicitudEnProceso(true);
    try {
      await axios.post('/api/autch/certificados', { nombre_certificado: nombreCertificado });
      setNombreCertificado('');
      const response = await axios.get('/api/autch/certificados');
      setCertificados(response.data);
    } catch (error) {
      console.error('Error solicitando el certificado:', error);
      setError('Hubo un error al solicitar el certificado.');
    } finally {
      setSolicitudEnProceso(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Certificados
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress size={50} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" variant="body1">
          {error}
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {certificados.length === 0 ? (
              <Typography variant="body1" align="center" sx={{ width: '100%' }}>
                No hay certificados disponibles.
              </Typography>
            ) : (
              certificados.map(certificado => (
                <Grid item xs={12} md={6} key={certificado.id_certificado}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {certificado.nombre_certificado}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Subido por: {certificado.usuario_sube_certificado || 'Pendiente'}
                      </Typography>
                      {certificado.fecha_subida && (
                        <Typography variant="body2" color="textSecondary">
                          Fecha de subida: {new Date(certificado.fecha_subida).toLocaleDateString()}
                        </Typography>
                      )}
                      {certificado.archivo_certificado && (
                        <Button
                          variant="contained"
                          onClick={() => window.open(certificado.archivo_certificado, '_blank')}
                          sx={{ mt: 2 }}
                          fullWidth
                        >
                          Descargar
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          <Box mt={4} display="flex" flexDirection="column" alignItems="center" width="100%">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Solicitar Nuevo Certificado
            </Typography>
            <TextField
              label="Nombre del Certificado"
              value={nombreCertificado}
              onChange={(e) => setNombreCertificado(e.target.value)}
              fullWidth
              sx={{ mb: 2, maxWidth: 500 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSolicitarCertificado}
              disabled={solicitudEnProceso || !nombreCertificado}
              sx={{ width: '100%', maxWidth: 500, py: 1.5 }}
            >
              {solicitudEnProceso ? 'Solicitando...' : 'Solicitar Certificado'}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
