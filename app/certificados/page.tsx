'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box, Divider, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

interface Certificado {
  id_certificado: number;
  nombre_certificado: string;
  fecha_subida: string | null;
  archivo_certificado: string | null;
}

const opcionesCertificados = [
  'Certificado Laboral',
  'Certificado de Ingresos y Retenciones',
  'Certificado de Retención en la Fuente',
  'Certificado de Retención de IVA o ICA',
];

export default function CertificadosPage() {
  const { userId } = useAuth();
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombreCertificado, setNombreCertificado] = useState('');
  const [solicitudEnProceso, setSolicitudEnProceso] = useState(false);

  useEffect(() => {
    const fetchCertificados = async () => {
      try {
        const response = await axios.get('/api/autch/certificados');
        setCertificados(response.data);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchCertificados();
  }, [userId]);

  const handleSolicitarCertificado = async () => {
    setSolicitudEnProceso(true);
    try {
      await axios.post('/api/autch/certificados', { nombre_certificado: nombreCertificado });
      setNombreCertificado('');
      const response = await axios.get('/api/autch/certificados');
      setCertificados(response.data);
    } finally {
      setSolicitudEnProceso(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
        Certificados
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2, backgroundColor: '#f1f8ff' }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          Solicitar Nuevo Certificado
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="nombre-certificado-label" sx={{ color: 'primary.main' }}>
            Seleccionar Certificado
          </InputLabel>
          <Select
            labelId="nombre-certificado-label"
            value={nombreCertificado}
            onChange={(e) => setNombreCertificado(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': { borderColor: 'primary.light' },
                '&:hover fieldset': { borderColor: 'primary.main' },
              },
            }}
          >
            {opcionesCertificados.map((opcion) => (
              <MenuItem key={opcion} value={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSolicitarCertificado}
          disabled={solicitudEnProceso || !nombreCertificado}
          sx={{
            width: '100%',
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: 2,
            backgroundColor: solicitudEnProceso ? 'grey.500' : 'primary.main',
            '&:hover': {
              backgroundColor: solicitudEnProceso ? 'grey.500' : 'primary.dark',
            },
          }}
        >
          {solicitudEnProceso ? 'Solicitando...' : 'Solicitar Certificado'}
        </Button>
      </Paper>

      <Grid container spacing={3}>
        {certificados.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary" variant="h6">
              No hay certificados disponibles.
            </Typography>
          </Grid>
        ) : (
          certificados.map((certificado) => (
            <Grid item xs={12} sm={6} key={certificado.id_certificado}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {certificado.nombre_certificado}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    Fecha de subida: {certificado.fecha_subida ? new Date(certificado.fecha_subida).toLocaleDateString() : 'Pendiente'}
                  </Typography>
                  <Box mt={2}>
                    {certificado.archivo_certificado ? (
                      <Button variant="outlined" color="primary" fullWidth onClick={() => window.open(certificado.archivo_certificado!, '_blank')}>
                        Descargar
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Solicitud pendiente, espera a que el administrador suba el certificado.
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

