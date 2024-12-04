'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Box,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface User {
  id: string;
  fullname: string;
  fulllastname: string;
  email: string;
  foto?: string;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/autch/user');
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar la lista de usuarios.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (confirm(`¿Está seguro que desea eliminar al usuario con ID ${userId}?`)) {
      try {
        await axios.delete(`/api/autch/user/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (err) {
        alert('Error al eliminar el usuario. Intenta nuevamente.');
        console.error('Error deleting user:', err);
      }
    }
  };

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4" component="h1">
          Recursos Humanos / Lista de Empleados
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/admin/users/create">
          Añadir Usuario
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const fullName = `${user.fullname} ${user.fulllastname}`.trim();
              const avatarUrl = user.foto ? `/images/users/${user.foto}` : '/images/default-avatar.png';

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={avatarUrl} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="body1">{fullName}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      component={Link}
                      href={`mailto:${user.email}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      href={`/admin/users/${user.id}`}
                      aria-label={`Ver detalles de ${fullName}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={`/admin/users/${user.id}/edit`}
                      aria-label={`Editar ${fullName}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      aria-label={`Eliminar ${fullName}`}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersPage;
