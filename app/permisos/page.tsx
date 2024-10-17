// app/permisos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // Ajusta esta ruta según tu estructura
import { List, ListItem, Button, Typography, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function PermisosPage() {
  const { userId } = useAuth();  // Obtener el userId del contexto de autenticación
  const [permisos, setPermisos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      axios.get(`/api/autch/permisos?userId=${userId}`)
        .then(response => setPermisos(response.data))
        .catch(error => console.error('Error obteniendo permisos:', error));
    }
  }, [userId]);

  const handleEdit = (id: number) => {
    router.push(`/permisos/editar/${id}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Mis Permisos</Typography>
        <List>
          {permisos.length === 0 ? (
            <Typography>No tienes permisos solicitados.</Typography>
          ) : (
            permisos.map((permiso: any) => (
              <ListItem key={permiso.id}>
                <Typography variant="body1">
                  {permiso.motivo_permiso} - Desde {new Date(permiso.fecha_inicio).toLocaleDateString()} hasta {new Date(permiso.fecha_fin).toLocaleDateString()}
                </Typography>
                <Button onClick={() => handleEdit(permiso.id)}>Editar</Button>
              </ListItem>
            ))
          )}
        </List>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => router.push('/permisos/solicitud')}>
          Solicitar Permiso
        </Button>
      </Box>
    </Container>
  );
}
