'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button, CircularProgress, TextField, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

const NominaDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [nomina, setNomina] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNomina = async () => {
      try {
        const response = await axios.get(`/api/autch/admin/nominas/${id}`);
        setNomina(response.data);
      } catch (error) {
        console.error('Error fetching nomina:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNomina();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Por favor, seleccione un archivo de nómina.');
      return;
    }

    const formData = new FormData();
    formData.append('archivo_nomina', file);
    formData.append('userId', nomina.userId.toString());
    formData.append('nombre_nomina', nomina.nombre_nomina);
    formData.append('usuario_sube_nomina', 'Admin');

    try {
      const response = await axios.post(`/api/autch/admin/nominas/${id}`, formData);
      alert('Archivo de nómina subido con éxito.');
      router.push('/admin/nominas');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al subir la nómina.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files) {
      setFile(fileInput.files[0]);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!nomina) {
    return <Typography variant="h6">No se encontraron detalles de la nómina.</Typography>;
  }

  return (
    <Container>
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
            Detalles de la Solicitud de Nómina
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <strong>Nombre de la Nómina:</strong> {nomina.nombre_nomina || 'Sin nombre'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Estado:</strong> {nomina.archivo_nomina ? 'Subido' : 'Pendiente'}
          </Typography>
          {!nomina.archivo_nomina && (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Sube el archivo de la nómina:</strong>
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    type="file"
                    name="archivo_nomina"
                    required
                    onChange={handleFileChange}
                    label="Seleccionar archivo de nómina"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', mt: 2 }}>
                  Subir Nómina
                </Button>
              </form>
            </>
          )}
          <Button
            onClick={() => router.push('/admin/nominas')}
            variant="outlined"
            sx={{ mt: 3, width: '100%' }}
          >
            Volver al Listado
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NominaDetailPage;





