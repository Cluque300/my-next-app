// app/vacaciones/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // Ajusta esta ruta según tu estructura
import { List, ListItem, Button, Typography, Container, Box } from '@mui/material';
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
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Mis Vacaciones</Typography>
        <List>
          {vacaciones.length === 0 ? (
            <Typography>No tienes vacaciones solicitadas.</Typography>
          ) : (
            vacaciones.map((vacacion: any) => (
              <ListItem key={vacacion.id}>
                <Typography variant="body1">
                  {vacacion.tipo_vacaciones} - Desde {new Date(vacacion.fecha_inicio).toLocaleDateString()} hasta {new Date(vacacion.fecha_fin).toLocaleDateString()}
                </Typography>
                <Button onClick={() => handleEdit(vacacion.id)}>Editar</Button>
              </ListItem>
            ))
          )}
        </List>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => router.push('/vacaciones/solicitud')}>
          Solicitar Vacaciones
        </Button>
      </Box>
    </Container>
  );
}

