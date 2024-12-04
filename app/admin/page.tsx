'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  Person,
  People,
  AttachMoney,
  Verified,
  School,
  Settings,
  Assignment,
  Announcement,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [adminId, setAdminId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const response = await fetch('/api/autch/user');
        const users = await response.json();
        const adminUser = users.find(
          (user: { role: string; id: number }) => user.role === 'ADMIN'
        );
        if (adminUser) {
          setAdminId(adminUser.id);
        }
      } catch (error) {
        console.error('Error fetching admin ID:', error);
      }
    };

    fetchAdminId();
  }, []);

  if (adminId === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Panel de Administración
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
          Administra y supervisa la plataforma desde un único panel de control.
        </Typography>

        <Grid container spacing={3}>
          {/* Tarjeta Mi Perfil */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Person fontSize="large" />
                <Button
                  variant="text"
                  component={Link}
                  href={`/users/${adminId}`}
                  sx={{ mt: 2 }}
                >
                  Mi Perfil
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Gestión de Usuarios */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <People fontSize="large" />
                <Typography variant="h6">Gestión de Usuarios</Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/users"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Lista de Usuarios
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/users/create"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Crear Usuario
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Gestión de Nóminas */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <AttachMoney fontSize="large" />
                <Typography variant="h6">Gestión de Nóminas</Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/nominas"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Gestionar Nóminas
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Gestión de Certificados */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Verified fontSize="large" />
                <Typography variant="h6">Gestión de Certificados</Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/certificados"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Gestionar Certificados
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Cursos */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <School fontSize="large" />
                <Typography variant="h6">Cursos</Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/cursos"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Gestionar Cursos
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/cursos/create"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Crear Curso
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Configuraciones */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Settings fontSize="large" />
                <Typography variant="h6">Configuraciones</Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/settings"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Configuraciones Generales
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Solicitudes */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Assignment fontSize="large" />
                <Typography variant="h6">Solicitudes</Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/solicitudes"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Gestionar Solicitudes
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Noticias */}
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Announcement fontSize="large" />
                <Typography variant="h6">Noticias</Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/admin/noticias"
                  sx={{ mt: 1, width: '100%' }}
                >
                  Gestionar Noticias
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
