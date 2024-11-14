// app/users/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Avatar, Chip } from '@mui/material';
import { teal, grey, blue } from '@mui/material/colors';

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
          estadoUsuario: user.estadoUsuario,
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
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress size={60} sx={{ color: teal[600] }} />
        <Typography variant="h6" sx={{ mt: 2, color: teal[700] }}>Cargando usuarios...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, textAlign: 'center', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: teal[700],
            borderBottom: `4px solid ${teal[700]}`,
            display: 'inline-block',
            pb: 1,
          }}
        >
          👥 Lista de Usuarios
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 20px rgba(0,0,0,0.1)', borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: blue[700] }}>
              <TableCell>
                <Typography fontWeight="bold" color="white" align="center">Nombre</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="white" align="center">Apellido</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="white" align="center">Correo</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" color="white" align="center">Estado</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: grey[50] },
                  '&:nth-of-type(even)': { backgroundColor: grey[100] },
                  '&:hover': {
                    backgroundColor: blue[50],
                  },
                  transition: 'background-color 0.3s ease',
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: teal[500], fontWeight: 'bold' }}>
                      {user.fullname[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: grey[800] }}>
                      {user.fullname}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ color: grey[700] }}>{user.fulllastname}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ color: grey[700] }}>{user.email}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={user.estadoUsuario}
                    color={user.estadoUsuario === 'Activo' ? 'success' : 'error'}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      paddingX: 1,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
