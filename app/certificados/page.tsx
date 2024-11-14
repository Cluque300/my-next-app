'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box, TextField, Divider, Grid, Paper } from '@mui/material';
import axios from 'axios';

interface Certificado {
    id_certificado: number;
    nombre_certificado: string;
    fecha_subida: string | null;
    archivo_certificado: string | null;
}

export default function CertificadosPage() {
    const { userId } = useAuth();
    const [certificados, setCertificados] = useState<Certificado[]>([]);
    const [loading, setLoading] = useState(true);
    const [nombreCertificado, setNombreCertificado] = useState('');
    const [solicitudEnProceso, setSolicitudEnProceso] = useState(false);

    useEffect(() => {
        const fetchCertificados = async () => {
            try {
                const response = await axios.get('/api/autch/certificados');
                setCertificados(response.data);
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchCertificados();
    }, [userId]);

    const handleSolicitarCertificado = async () => {
        setSolicitudEnProceso(true);
        try {
            await axios.post('/api/autch/certificados', { nombre_certificado: nombreCertificado });
            setNombreCertificado('');
            const response = await axios.get('/api/autch/certificados');
            setCertificados(response.data);
        } finally {
            setSolicitudEnProceso(false);
        }
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
                Certificados
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2, backgroundColor: '#f1f8ff' }}>
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Solicitar Nuevo Certificado
                </Typography>
                <TextField
                    label="Nombre del Certificado"
                    value={nombreCertificado}
                    onChange={(e) => setNombreCertificado(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                        mb: 2,
                        '& .MuiInputLabel-root': { color: 'primary.main' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'primary.light' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSolicitarCertificado}
                    disabled={solicitudEnProceso || !nombreCertificado}
                    sx={{
                        width: '100%',
                        py: 1.5,
                        fontWeight: 'bold',
                        borderRadius: 2,
                        backgroundColor: solicitudEnProceso ? 'grey.500' : 'primary.main',
                        '&:hover': {
                            backgroundColor: solicitudEnProceso ? 'grey.500' : 'primary.dark',
                        },
                    }}
                >
                    {solicitudEnProceso ? 'Solicitando...' : 'Solicitar Certificado'}
                </Button>
            </Paper>

            <Grid container spacing={3}>
                {certificados.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography align="center" color="textSecondary" variant="h6">
                            No hay certificados disponibles.
                        </Typography>
                    </Grid>
                ) : (
                    certificados.map(certificado => (
                        <Grid item xs={12} sm={6} key={certificado.id_certificado}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        {certificado.nombre_certificado}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                        Fecha de subida: {certificado.fecha_subida ? new Date(certificado.fecha_subida).toLocaleDateString() : 'Pendiente'}
                                    </Typography>
                                    <Box mt={2}>
                                        {certificado.archivo_certificado ? (
                                            <Button variant="outlined" color="primary" fullWidth onClick={() => window.open(certificado.archivo_certificado!, '_blank')}>
                                                Descargar
                                            </Button>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                Solicitud pendiente, espera a que el administrador suba el certificado.
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}

