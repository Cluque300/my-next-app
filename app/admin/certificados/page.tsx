'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box, Divider, Avatar, Grid } from '@mui/material';
import axios from 'axios';

interface SolicitudCertificado {
    id_certificado: number;
    nombre_certificado: string;
    archivo_certificado: string | null;
    usuario?: {
        username: string;
    };
}

export default function AdminCertificadosPage() {
    const [solicitudes, setSolicitudes] = useState<SolicitudCertificado[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await axios.get('/api/autch/certificados');
                setSolicitudes(response.data);
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

        await axios.post('/api/autch/admin/certificados', formData);
        setSolicitudes((prev) =>
            prev.map((s) =>
                s.id_certificado === solicitud.id_certificado
                    ? { ...s, archivo_certificado: `/uploads/certificados/${file.name}` }
                    : s
            )
        );
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
                Administrar Solicitudes de Certificados
            </Typography>
            <Divider sx={{ mb: 4 }} />

            {solicitudes.length === 0 ? (
                <Typography align="center" color="textSecondary" variant="h6">
                    No hay solicitudes disponibles.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {solicitudes.map(solicitud => (
                        <Grid item xs={12} sm={6} key={solicitud.id_certificado}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
                                <Avatar sx={{ width: 56, height: 56, mt: 2, bgcolor: 'primary.main' }}>
                                    {solicitud.usuario?.username[0].toUpperCase()}
                                </Avatar>
                                <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        {solicitud.nombre_certificado}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                        Solicitado por: <strong>{solicitud.usuario?.username || 'Desconocido'}</strong>
                                    </Typography>

                                    <Box mt={2} display="flex" justifyContent="center">
                                        {solicitud.archivo_certificado ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => window.open(solicitud.archivo_certificado!, '_blank')}
                                                sx={{ fontWeight: 'bold', width: '100%', maxWidth: 250 }}
                                            >
                                                Descargar
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                component="label"
                                                color="secondary"
                                                sx={{ fontWeight: 'bold', py: 1, width: '100%', maxWidth: 250 }}
                                            >
                                                Subir Certificado
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            handleUpload(solicitud, e.target.files[0]);
                                                        }
                                                    }}
                                                />
                                            </Button>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
