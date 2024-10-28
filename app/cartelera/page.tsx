"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Container,
  Box,
} from '@mui/material';
import { useAuth } from '@/context/AuthContext';

interface Solicitud {
  id: number;
  tipo_solicitud: 'vacaciones' | 'permiso';
  estado_solicitud: string;
  createdAt: string;
  tipo_vacaciones?: string;
  motivo_permiso?: string;
}

export default function CarteleraPage() {
  const { userId, isLoggedIn, loading } = useAuth();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (isLoggedIn && userId) {
        try {
          const response = await axios.get(`/api/autch/solicitudes/${userId}`);
          setSolicitudes(response.data);
        } catch (error) {
          console.error('Error obteniendo solicitudes:', error);
          setError('Error al obtener las solicitudes');
        } finally {
          setLoadingSolicitudes(false);
        }
      } else {
        setLoadingSolicitudes(false);
      }
    };

    const interval = setInterval(() => {
      if (!loading) {
        fetchSolicitudes();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLoggedIn, userId, loading]);

  if (loading || loadingSolicitudes) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Box mb={4}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Mi Cartelera de Solicitudes
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          Aquí puedes ver tus solicitudes registradas con el estado actual de cada una.
        </Typography>
      </Box>
      {solicitudes.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }} variant="h6" color="textSecondary">
          No tienes solicitudes registradas.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    Tipo de Solicitud
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    Fecha de Creación
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    Estado
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudes.map((solicitud) => (
                <TableRow
                  key={solicitud.id}
                  hover
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                  }}
                >
                  <TableCell>
                    {solicitud.tipo_solicitud === 'vacaciones'
                      ? `Vacaciones - ${solicitud.tipo_vacaciones || 'No especificado'}`
                      : `Permiso - ${solicitud.motivo_permiso || 'No especificado'}`}
                  </TableCell>
                  <TableCell>{new Date(solicitud.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color:
                          solicitud.estado_solicitud === 'Aprobado'
                            ? 'green'
                            : solicitud.estado_solicitud === 'Pendiente'
                            ? 'orange'
                            : 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {solicitud.estado_solicitud}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
