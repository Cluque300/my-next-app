'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';
import Link from 'next/link';

// Definimos la interfaz para la nómina con la fecha como cadena
interface Nomina {
  id_nomina: number;
  usuario: { fullname: string };
  fecha_solicitud: string; // Definimos la fecha como string
  archivo_nomina?: string;
}

const NominasPage = () => {
  const [nominas, setNominas] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNominas = async () => {
      try {
        const response = await axios.get('/api/autch/admin/nominas');
        setNominas(response.data);
      } catch (error) {
        console.error('Error fetching nominas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNominas();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
          Solicitudes de Nómina
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Usuario</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha de Solicitud</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nominas.map((nomina) => (
                <TableRow key={nomina.id_nomina} hover>
                  <TableCell>{nomina.usuario?.fullname}</TableCell>
                  <TableCell>
                    {nomina.fecha_solicitud
                      ? new Date(nomina.fecha_solicitud).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Fecha no disponible'}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={nomina.archivo_nomina ? 'success.main' : 'text.secondary'}
                    >
                      {nomina.archivo_nomina ? 'Disponible para descargar' : 'Pendiente'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      href={`/admin/nominas/${nomina.id_nomina}`}
                      variant="outlined"
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default NominasPage;
