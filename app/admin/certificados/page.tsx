'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

interface SolicitudCertificado {
    id_certificado: number;
    nombre_certificado: string;
    fecha_subida: string;
    usuario: {
        username: string; // Campo que incluye el nombre de usuario
    };
    archivo_certificado: string | null;
}

export default function AdminCertificadosPage() {
    const { userId } = useAuth();
    const [solicitudes, setSolicitudes] = useState<SolicitudCertificado[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await axios.get('/api/autch/certificados');
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error obteniendo solicitudes de certificados:', error);
                setError('Hubo un error al obtener las solicitudes. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, []);

    const handleUpload = async (solicitud: SolicitudCertificado, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id_certificado', solicitud.id_certificado.toString());

        try {
            await axios.post('/api/autch/admin/certificados', formData);
            setSolicitudes((prev) => 
                prev.map((s) => 
                    s.id_certificado === solicitud.id_certificado 
                        ? { ...s, archivo_certificado: `/uploads/certificados/${file.name}`, usuario_sube_certificado: 'ADMIN' } 
                        : s
                )
            );
        } catch (error) {
            console.error('Error subiendo el certificado:', error);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography color="error" align="center">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Administrar Solicitudes de Certificados</Typography>
            {solicitudes.length === 0 ? (
                <Typography align="center">No hay solicitudes disponibles.</Typography>
            ) : (
                solicitudes.map(solicitud => (
                    <Card key={solicitud.id_certificado} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{solicitud.nombre_certificado}</Typography>
                            <Typography variant="body2">Solicitado por: {solicitud.usuario.username}</Typography> {/* Cambiado aquí */}
                            <Typography variant="body2">Fecha de solicitud: {new Date(solicitud.fecha_subida).toLocaleDateString()}</Typography>
                            {solicitud.archivo_certificado ? (
                                <Button variant="contained" onClick={() => window.open(solicitud.archivo_certificado!, '_blank')}>
                                    Descargar Certificado
                                </Button>
                            ) : (
                                <Button variant="contained" component="label">
                                    Subir Certificado
                                    <input type="file" hidden onChange={(e) => {
                                        if (e.target.files) {
                                            handleUpload(solicitud, e.target.files[0]);
                                        }
                                    }} />
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
}
