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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/autch/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (confirm(`¿Está seguro que desea eliminar al usuario con ID ${userId}?`)) {
      try {
        await axios.delete(`/api/autch/user/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

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
              <TableCell>Celular</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={`/images/users/${user.avatar}`} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.role}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>+57 {user.phone}</TableCell>
                <TableCell>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </TableCell>
                <TableCell>
                  <IconButton component={Link} href={`/admin/users/${user.id}`} aria-label="Ver usuario">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton component={Link} href={`/admin/users/${user.id}/edit`} aria-label="Editar usuario">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} aria-label="Eliminar usuario" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersPage;
