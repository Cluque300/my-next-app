// app/certificados/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

interface Certificado {
    id_certificado: number;
    nombre_certificado: string;
    fecha_subida: string | null;
    archivo_certificado: string | null;
}

export default function CertificadoDetailPage() {
    const params = useParams();
    const { id } = params;
    const [certificado, setCertificado] = useState<Certificado | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificado = async () => {
            if (!id) return;

            try {
                const response = await axios.get(`/api/autch/certificados/${id}`);
                setCertificado(response.data);
            } catch (error) {
                console.error('Error obteniendo el certificado:', error);
                setError('Hubo un error al obtener el certificado. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificado();
    }, [id]);

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

    if (!certificado) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography align="center">No se encontró el certificado.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {certificado.nombre_certificado}
                    </Typography>
                    <Typography variant="body2">
                        Fecha de subida: {certificado.fecha_subida ? new Date(certificado.fecha_subida).toLocaleDateString() : 'Pendiente'}
                    </Typography>
                    <Box mt={3}>
                        {certificado.archivo_certificado ? (
                            <Button variant="contained" onClick={() => window.open(certificado.archivo_certificado!, '_blank')}>
                                Descargar Certificado
                            </Button>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                Certificado pendiente, espera a que el administrador lo suba.
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
