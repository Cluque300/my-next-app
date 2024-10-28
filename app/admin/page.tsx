'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Box, List, ListItem, CircularProgress, Button, Paper, Divider } from '@mui/material';

const AdminDashboard = () => {
    const [adminId, setAdminId] = useState<number | null>(null);

    useEffect(() => {
        const fetchAdminId = async () => {
            try {
                const response = await fetch('/api/autch/user');
                const users = await response.json();
                const adminUser = users.find((user: { role: string; id: number }) => user.role === 'ADMIN');
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

                <Box display="flex" flexDirection="column" gap={3}>
                    <Button
                        variant="outlined"
                        component={Link}
                        href={`/users/${adminId}`}
                        fullWidth
                        sx={{ mb: 2, py: 1.5 }}
                    >
                        Mi Perfil
                    </Button>

                    <Divider />

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Gestión de Usuarios
                        </Typography>
                        <List>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/admin/users"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Lista de Usuarios
                                </Button>
                            </ListItem>
                            <ListItem disablePadding>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/admin/users/create"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Crear Usuario
                                </Button>
                            </ListItem>
                        </List>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Gestión de Nóminas
                        </Typography>
                        <List>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/admin/nominas"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Gestionar Nóminas
                                </Button>
                            </ListItem>
                        </List>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Gestión de Certificados
                        </Typography>
                        <List>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/admin/certificados"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Gestionar Certificados
                                </Button>
                            </ListItem>
                        </List>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Cursos
                        </Typography>
                        <List>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/admin/cursos"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Gestionar Cursos
                                </Button>
                            </ListItem>
                            <ListItem disablePadding>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/admin/cursos/create"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Crear Curso
                                </Button>
                            </ListItem>
                        </List>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Configuraciones
                        </Typography>
                        <List>
                            <ListItem disablePadding>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/admin/settings"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Configuraciones Generales
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminDashboard;

