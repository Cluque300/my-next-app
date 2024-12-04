'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  fullname: string;
  fulllastname: string;
  foto?: string;
  role: string;
  email: string;
  estadoUsuario?: string;
}

const AdminUserDetailPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/autch/user/${params.id}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Usuario no encontrado.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        {/* Avatar y nombre */}
        <Box textAlign="center" mb={4}>
          <Avatar
            src={user.foto ? `/images/users/${user.foto}` : '/images/default-avatar.png'}
            alt={user.fullname}
            sx={{ width: 100, height: 100, margin: '0 auto' }}
          />
          <Typography variant="h4" color="primary" gutterBottom>
            {user.fullname} {user.fulllastname}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.role}
          </Typography>
        </Box>

        {/* Detalles del usuario */}
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Estado:</strong> {user.estadoUsuario || 'No especificado'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <strong>Correo:</strong>{' '}
              <Typography
                component="a"
                href={`mailto:${user.email}`}
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {user.email}
              </Typography>
            </Typography>
          </Grid>
        </Grid>

        {/* Botón de edición */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push(`/admin/users/${user.id}/edit`)}
            sx={{
              borderRadius: 2,
              fontWeight: 'bold',
            }}
          >
            Editar Usuario
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminUserDetailPage;
