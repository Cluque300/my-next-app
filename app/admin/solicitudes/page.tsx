'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Box, Typography, Card, CardContent, Grid } from '@mui/material';

interface Solicitud {
  id: number;
  tipo_solicitud: string;
  estado_solicitud: string;
  user: { fullname: string };
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  useEffect(() => {
    axios.get('/api/autch/solicitudes')
      .then(response => setSolicitudes(response.data))
      .catch(error => console.error('Error obteniendo solicitudes:', error));
  }, []);

  const handleAceptar = (id: number, tipo: string) => {
    const url = tipo === 'vacaciones'
      ? `/api/autch/vacaciones/aceptar/${id}`
      : `/api/autch/permisos/aceptar/${id}`;

    axios.put(url)
      .then(() => window.location.reload())
      .catch(error => console.error('Error aceptando solicitud:', error));
  };

  const handleRechazar = (id: number, tipo: string) => {
    const url = tipo === 'vacaciones'
      ? `/api/autch/vacaciones/rechazar/${id}`
      : `/api/autch/permisos/rechazar/${id}`;

    axios.put(url)
      .then(() => window.location.reload())
      .catch(error => console.error('Error rechazando solicitud:', error));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Solicitudes Pendientes
      </Typography>
      {solicitudes.length === 0 ? (
        <Typography variant="body1">No hay solicitudes pendientes.</Typography>
      ) : (
        <Grid container spacing={3}>
          {solicitudes.map(solicitud => (
            <Grid item xs={12} key={solicitud.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {solicitud.tipo_solicitud.charAt(0).toUpperCase() + solicitud.tipo_solicitud.slice(1)} de {solicitud.user.fullname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Estado: {solicitud.estado_solicitud}
                  </Typography>
                  {solicitud.estado_solicitud === 'Pendiente' && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAceptar(solicitud.id, solicitud.tipo_solicitud)}
                        sx={{ mr: 2 }}
                      >
                        Aceptar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleRechazar(solicitud.id, solicitud.tipo_solicitud)}
                      >
                        Rechazar
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
