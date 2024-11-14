'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
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
import { useAuth } from '@/context/AuthContext';

interface Nomina {
  id_nomina: number;
  nombre_nomina: string;
  archivo_nomina?: string;
}

const UserNominasPage = () => {
  const { userId } = useAuth();
  const [nominas, setNominas] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNominas = async () => {
      try {
        const response = await axios.get(`/api/autch/nominas`);
        setNominas(response.data);
      } catch (error) {
        console.error('Error fetching user nominas:', error);
        setError('Error al cargar las nóminas.');
      } finally {
        setLoading(false);
      }
    };

    fetchNominas();
  }, [userId]);

  const handleRequestNomina = async () => {
    try {
      const response = await axios.post('/api/autch/nominas', {
        userId,
        nombre_nomina: "Nueva Nómina",
      });
      setNominas(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error al solicitar nómina:', error);
    }
  };

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
          Mis Solicitudes de Nómina
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Box display="flex" justifyContent="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestNomina}
            sx={{ fontWeight: 'bold', py: 1.5 }}
          >
            Solicitar Nueva Nómina
          </Button>
        </Box>

        {error ? (
          <Typography color="error" align="center" sx={{ mb: 3 }}>
            {error}
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre de Nómina</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nominas.map((nomina) => (
                  <TableRow key={nomina.id_nomina} hover>
                    <TableCell>{nomina.nombre_nomina}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color={nomina.archivo_nomina ? 'success.main' : 'text.secondary'}
                      >
                        {nomina.archivo_nomina ? 'Descargar' : 'Pendiente'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        href={`/nominas/${nomina.id_nomina}`}
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
        )}
      </Paper>
    </Container>
  );
};

export default UserNominasPage;
