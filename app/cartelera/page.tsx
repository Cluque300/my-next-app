"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  CircularProgress,
  Container,
  Box,
  Grid,
} from '@mui/material';
import { BeachAccess, EventAvailable } from '@mui/icons-material';
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
      <Box mb={4} textAlign="center">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            display: 'inline-block',
            borderBottom: '3px solid #1976d2',
            paddingBottom: 1,
          }}
        >
          📋 Mi Cartelera de Solicitudes
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Visualiza el estado de tus solicitudes recientes.
        </Typography>
      </Box>

      {solicitudes.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }} variant="h6" color="textSecondary">
          No tienes solicitudes registradas.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {solicitudes.map((solicitud) => (
            <Grid item xs={12} sm={6} key={solicitud.id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardHeader
                  avatar={
                    solicitud.tipo_solicitud === 'vacaciones' ? (
                      <BeachAccess color="primary" />
                    ) : (
                      <EventAvailable color="secondary" />
                    )
                  }
                  title={
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#424242' }}>
                      {solicitud.tipo_solicitud === 'vacaciones'
                        ? `Vacaciones - ${solicitud.tipo_vacaciones || 'No especificado'}`
                        : `Permiso - ${solicitud.motivo_permiso || 'No especificado'}`}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" color="textSecondary">
                      Creado el: {new Date(solicitud.createdAt).toLocaleDateString()}
                    </Typography>
                  }
                />
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" color="textSecondary">
                      Estado:
                    </Typography>
                    <Chip
                      label={solicitud.estado_solicitud}
                      color={
                        solicitud.estado_solicitud === 'Aprobado'
                          ? 'success'
                          : solicitud.estado_solicitud === 'Pendiente'
                          ? 'warning'
                          : 'error'
                      }
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
