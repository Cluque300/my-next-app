'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box, TextField, Divider } from '@mui/material';
import axios from 'axios';

interface Certificado {
    id_certificado: number;
    nombre_certificado: string;
    fecha_subida: string;
    archivo_certificado: string;
}

export default function CertificadosPage() {
    const { userId } = useAuth(); // Obtener userId desde el contexto
    const [certificados, setCertificados] = useState<Certificado[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [nombreCertificado, setNombreCertificado] = useState<string>('');
    const [solicitudEnProceso, setSolicitudEnProceso] = useState<boolean>(false);

    useEffect(() => {
        const fetchCertificados = async () => {
            if (!userId) return; // Si no hay userId, no hacer la petición

            try {
                const response = await axios.get('/api/autch/certificados');
                setCertificados(response.data);
            } catch (error) {
                console.error('Error obteniendo certificados:', error);
                setError('Hubo un error al obtener los certificados. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificados();
    }, [userId]); // Ejecuta cuando userId cambia

    const handleSolicitarCertificado = async () => {
        setSolicitudEnProceso(true);
        try {
            await axios.post('/api/autch/certificados', { nombre_certificado: nombreCertificado });
            setNombreCertificado('');
            const response = await axios.get('/api/autch/certificados');
            setCertificados(response.data);
        } catch (error) {
            console.error('Error solicitando el certificado:', error);
            setError('Hubo un error al solicitar el certificado.');
        } finally {
            setSolicitudEnProceso(false);
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
                <Typography color="error" align="center">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 4, color: 'primary.main' }}>
                Certificados
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" align="center">Solicitar Nuevo Certificado</Typography>
                <TextField
                    label="Nombre del Certificado"
                    value={nombreCertificado}
                    onChange={(e) => setNombreCertificado(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={handleSolicitarCertificado}
                    disabled={solicitudEnProceso || !nombreCertificado}
                    sx={{ width: '100%' }}
                >
                    {solicitudEnProceso ? 'Solicitando...' : 'Solicitar Certificado'}
                </Button>
            </Box>

            {certificados.length === 0 ? (
                <Typography align="center">No hay certificados disponibles.</Typography>
            ) : (
                certificados.map(certificado => (
                    <Card key={certificado.id_certificado} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{certificado.nombre_certificado}</Typography>
                            <Typography variant="body2">Fecha de subida: {new Date(certificado.fecha_subida).toLocaleDateString()}</Typography>
                            {certificado.archivo_certificado ? (
                                <Button variant="contained" onClick={() => window.open(certificado.archivo_certificado, '_blank')}>
                                    Descargar
                                </Button>
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    Solicitud pendiente, espera a que el administrador suba el certificado.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
}

