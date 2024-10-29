// app/users/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Avatar } from '@mui/material';
import { teal, blueGrey } from '@mui/material/colors';

interface User {
  id: number;
  fullname: string;
  fulllastname: string;
  email: string;
  estadoUsuario: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/autch/user');
        const data = await response.json();

        const filteredData = data.map((user: User) => ({
          id: user.id,
          fullname: user.fullname,
          fulllastname: user.fulllastname,
          email: user.email,
          estadoUsuario: user.estadoUsuario
        }));

        setUsers(filteredData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: 8 }}>
        <CircularProgress size={60} sx={{ color: teal[600] }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>Cargando usuarios...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 8, marginBottom: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: '600', color: teal[700] }}>Lista de Usuarios</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: blueGrey[700] }}>
              <TableCell><Typography fontWeight="bold" color="white">Nombre</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" color="white">Apellido</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" color="white">Correo</Typography></TableCell>
              <TableCell><Typography fontWeight="bold" color="white">Estado</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: blueGrey[50] } }}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: teal[500], mr: 2 }}>{user.fullname[0]}</Avatar>
                    <Typography>{user.fullname}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.fulllastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold" color={user.estadoUsuario === 'Activo' ? teal[700] : 'error'}>
                    {user.estadoUsuario}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
