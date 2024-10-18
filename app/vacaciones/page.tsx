// app/vacaciones/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // Ajusta esta ruta según tu estructura
import { List, ListItem, Button, Typography, Container, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function VacacionesPage() {
  const { userId } = useAuth();  // Obtener el userId del contexto de autenticación
  const [vacaciones, setVacaciones] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      axios.get(`/api/autch/vacaciones?userId=${userId}`)
        .then(response => setVacaciones(response.data))
        .catch(error => console.error('Error obteniendo vacaciones:', error));
    }
  }, [userId]);

  const handleEdit = (id: number) => {
    router.push(`/vacaciones/editar/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Mis Vacaciones
        </Typography>

        <List>
          {vacaciones.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              No tienes vacaciones solicitadas.
            </Typography>
          ) : (
            vacaciones.map((vacacion: any) => (
              <ListItem
                key={vacacion.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
              >
                <Typography variant="body1">
                  {vacacion.tipo_vacaciones} - Desde {new Date(vacacion.fecha_inicio).toLocaleDateString()} hasta {new Date(vacacion.fecha_fin).toLocaleDateString()}
                </Typography>
                <Button variant="outlined" size="small" onClick={() => handleEdit(vacacion.id)}>
                  Editar
                </Button>
              </ListItem>
            ))
          )}
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/vacaciones/solicitud')}
          >
            Solicitar Vacaciones
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
