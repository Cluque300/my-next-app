'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Box, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';

const AdminDashboard = () => {
    const [adminId, setAdminId] = useState<number | null>(null);

    useEffect(() => {
        const fetchAdminId = async () => {
            try {
                const response = await fetch('/api/autch/user'); // Asegúrate de que esta ruta devuelva los usuarios
                const users = await response.json();
                const adminUser = users.find((user: { role: string; id: number }) => user.role === 'ADMIN'); // Suponiendo que tienes un campo "role"
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
        return <CircularProgress />; // Indicador de carga mientras se obtiene el adminId
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Panel de Administración
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Button variant="outlined" component={Link} href={`/users/${adminId}`} fullWidth>
                    Mi Perfil
                </Button>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Gestión de Usuarios
                </Typography>
                <List>
                    <ListItem>
                        <Button variant="contained" component={Link} href="/admin/users" fullWidth>
                            Lista de Usuarios
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" component={Link} href="/admin/users/create" fullWidth>
                            Crear Usuario
                        </Button>
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Solicitudes
                </Typography>
                <List>
                    <ListItem>
                        <Button variant="contained" component={Link} href="/admin/solicitudes" fullWidth>
                            Ver Solicitudes
                        </Button>
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Otras Secciones (Futuras)
                </Typography>
                <List>
                    <ListItem>
                        <Button variant="contained" component={Link} href="/admin/roles" fullWidth>
                            Gestión de Roles (Futuro)
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" component={Link} href="/admin/reports" fullWidth>
                            Reportes y Estadísticas (Futuro)
                        </Button>
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Configuraciones
                </Typography>
                <List>
                    <ListItem>
                        <Button variant="contained" component={Link} href="/admin/settings" fullWidth>
                            Configuraciones Generales (Futuro)
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
};

export default AdminDashboard;
